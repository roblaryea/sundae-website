import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const outputDir = path.resolve('output/playwright/tiktok-review-recording')
const baseUrl = process.env.TIKTOK_REVIEW_BASE_URL || 'https://sundaetech.ai/tiktok-review'
const useRealChromeProfile = process.env.TIKTOK_REVIEW_USE_REAL_PROFILE === '1'
const realChromeUserDataDir =
  process.env.TIKTOK_REVIEW_REAL_CHROME_USER_DATA_DIR ||
  path.join(process.env.HOME || '', 'Library/Application Support/Google/Chrome')
const realChromeProfileDirectory =
  process.env.TIKTOK_REVIEW_REAL_CHROME_PROFILE_DIRECTORY || 'Default'
const sessionCookie = process.env.TIKTOK_REVIEW_SESSION_COOKIE || ''
const sessionCookieDomain = process.env.TIKTOK_REVIEW_SESSION_DOMAIN || 'sundaetech.ai'
const sessionCookiePath = process.env.TIKTOK_REVIEW_SESSION_PATH || '/'
const sessionCookieName = process.env.TIKTOK_REVIEW_SESSION_NAME || 'sundae_tiktok_session'
const connectTimeoutMs = Number(process.env.TIKTOK_REVIEW_AUTH_TIMEOUT_MS || 90_000)
const publishTimeoutMs = Number(process.env.TIKTOK_REVIEW_PUBLISH_TIMEOUT_MS || 120_000)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function smoothScroll(page, amount, steps = 8, pauseMs = 120) {
  const increment = amount / steps
  for (let step = 0; step < steps; step += 1) {
    await page.mouse.wheel(0, increment)
    await delay(pauseMs)
  }
}

async function run() {
  await fs.rm(outputDir, { recursive: true, force: true })
  await fs.mkdir(outputDir, { recursive: true })

  let browser
  let context

  if (useRealChromeProfile) {
    context = await chromium.launchPersistentContext(realChromeUserDataDir, {
      channel: 'chrome',
      headless: false,
      ignoreDefaultArgs: ['--use-mock-keychain'],
      viewport: { width: 1512, height: 982 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1512, height: 982 },
      },
      args: [
        `--profile-directory=${realChromeProfileDirectory}`,
        '--window-size=1600,1200',
      ],
    })
  } else {
    browser = await chromium.launch({
      channel: 'chrome',
      headless: false,
      args: ['--window-size=1600,1200'],
    })

    context = await browser.newContext({
      viewport: { width: 1512, height: 982 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1512, height: 982 },
      },
    })
  }

  if (sessionCookie) {
    await context.addCookies([
      {
        name: sessionCookieName,
        value: sessionCookie,
        domain: sessionCookieDomain,
        path: sessionCookiePath,
        httpOnly: true,
        secure: baseUrl.startsWith('https://'),
        sameSite: 'Lax',
      },
    ])
  }

  const existingPages = context.pages()
  const page = existingPages[0] || (await context.newPage())
  if (existingPages.length > 1) {
    await Promise.all(existingPages.slice(1).map((candidate) => candidate.close().catch(() => {})))
  }

  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  const acceptCookies = page.getByRole('button', { name: /accept/i })
  if (await acceptCookies.count()) {
    await acceptCookies.first().click().catch(() => {})
    await delay(400)
  }

  await delay(1200)
  await smoothScroll(page, 240, 6, 100)
  await delay(700)

  if (!(await page.getByText(/TikTok sandbox account connected/i).count())) {
    await page.getByRole('link', { name: /connect tiktok with login kit/i }).click()
    await waitForAuthFlow(page)
  }

  await delay(1200)
  await smoothScroll(page, 450, 8, 110)
  await delay(1200)
  await smoothScroll(page, 520, 8, 110)
  await delay(600)

  await ensurePostingMode(page, 'direct')
  await delay(900)

  const captionField = page.locator('textarea')
  await captionField.click()
  await delay(300)
  await captionField.fill(
    'Restaurant operators need one command center that connects campaign spend to traffic, check averages, and margin lift. This approved Sundae explainer is being published to TikTok from the Sundae website. #RestaurantIntelligence #TikTokForBusiness #Sundae'
  )
  await delay(700)

  const privacySelect = page.locator('select[name="privacy"]')
  const directPrivacy = await selectPrivacyOption(privacySelect, ['SELF_ONLY', 'PUBLIC_TO_EVERYONE', 'MUTUAL_FOLLOW_FRIENDS'])
  const commentToggle = page.locator('input[name="comments"]')
  if (!(await commentToggle.isChecked())) {
    await commentToggle.check()
  }
  await delay(700)
  const duetToggle = page.locator('input[name="duet"]')
  if (!(await duetToggle.isChecked())) {
    await duetToggle.check()
  }
  await delay(700)
  const stitchToggle = page.locator('input[name="stitch"]')
  if (!(await stitchToggle.isChecked())) {
    await stitchToggle.check()
  }
  await delay(700)

  await page.locator('input[name="consent"]').check()
  await delay(900)

  await page.getByRole('button', { name: /publish to tiktok/i }).click()
  await delay(1200)
  if (baseUrl.includes('demo=mock')) {
    await showMockResult(page, {
      mode: 'direct',
      caption: await captionField.inputValue(),
      privacy: directPrivacy || 'SELF_ONLY',
      comments: true,
      duet: true,
      stitch: true,
      publishStatus: 'PUBLISH_COMPLETE',
      publishIdPrefix: 'mock_direct_publish',
      postIdPrefix: 'mock_direct_post',
    })
  } else {
    await waitForPublish(page)
  }

  await maybeShowTikTokPost(page)
  await delay(1200)
  const statusSection = page.locator('#status')
  await statusSection.scrollIntoViewIfNeeded()
  await delay(2000)
  const storedPublishResult = page.getByText(/stored publish result/i)
  if (await storedPublishResult.count()) {
    await storedPublishResult.first().scrollIntoViewIfNeeded()
    await delay(1800)
  }

  if (baseUrl.includes('demo=mock')) {
    const draftUrl = new URL('/tiktok-review', baseUrl)
    draftUrl.searchParams.set('demo', 'mock')
    draftUrl.searchParams.set('auth', 'connected')
    draftUrl.searchParams.set('mode', 'draft')
    await page.goto(draftUrl.toString(), { waitUntil: 'networkidle' })
  } else {
    await ensurePostingMode(page, 'draft')
  }
  await delay(900)

  await captionField.click()
  await delay(250)
  await captionField.fill(
    'Restaurant operators need one command center that connects campaign spend to traffic, check averages, and margin lift. This approved Sundae explainer is being published to TikTok from the Sundae website. #RestaurantIntelligence #TikTokForBusiness #Sundae'
  )
  await delay(700)

  if (!(await commentToggle.isChecked())) {
    await commentToggle.check()
  }
  await delay(700)
  if (await duetToggle.isChecked()) {
    await duetToggle.uncheck().catch(() => {})
  }
  await delay(500)
  if (await stitchToggle.isChecked()) {
    await stitchToggle.uncheck().catch(() => {})
  }
  await delay(500)

  await page.locator('input[name="consent"]').check()
  await delay(900)

  await page.getByRole('button', { name: /send draft to tiktok/i }).click()
  await delay(1200)
  if (baseUrl.includes('demo=mock')) {
    await showMockResult(page, {
      mode: 'draft',
      caption: await captionField.inputValue(),
      privacy: 'SELF_ONLY',
      comments: true,
      duet: false,
      stitch: false,
      publishStatus: 'SEND_TO_USER_INBOX',
      publishIdPrefix: 'mock_draft_publish',
      postIdPrefix: '',
    })
  } else {
    await waitForPublish(page)
  }

  await delay(1200)
  await statusSection.scrollIntoViewIfNeeded()
  await delay(2200)
  if (await storedPublishResult.count()) {
    await storedPublishResult.first().scrollIntoViewIfNeeded()
    await delay(1800)
  }
  const draftHandoff = page.getByText(/upload-to-draft request is complete inside sundae/i)
  if (await draftHandoff.count()) {
    await draftHandoff.first().scrollIntoViewIfNeeded()
    await delay(2400)
  }
  const activityLink = page.getByRole('link', { name: /open tiktok/i })
  if (await activityLink.count()) {
    await activityLink.first().click().catch(() => {})
    await delay(2400)
  }
  await delay(2200)

  const video = page.video()
  await context.close()
  if (browser) {
    await browser.close()
  }

  const originalVideoPath = await video.path()
  const finalVideoPath = path.resolve('output/playwright/tiktok-review-demo.webm')
  await fs.copyFile(originalVideoPath, finalVideoPath)
  await transcodeToMp4(finalVideoPath, path.resolve('output/playwright/tiktok-review-natural.mp4'))

  console.log(finalVideoPath)
}

async function waitForAuthFlow(page) {
  const start = Date.now()
  while (Date.now() - start < connectTimeoutMs) {
    const url = page.url()
    if (url.includes('/tiktok-review') && /auth=(connected|error)/.test(url)) {
      return
    }

    if (url.includes('tiktok.com')) {
      const continueButtons = [
        /authorize/i,
        /continue/i,
        /allow/i,
        /agree/i,
        /confirm/i,
      ]

      for (const name of continueButtons) {
        const button = page.getByRole('button', { name })
        if (await button.count()) {
          await button.first().click().catch(() => {})
          break
        }
      }
    }

    await delay(1500)
  }

  throw new Error('Timed out waiting for TikTok auth to return to the review page. If needed, set TIKTOK_REVIEW_SESSION_COOKIE to a real sandbox session cookie and rerun.')
}

async function waitForPublish(page) {
  const start = Date.now()
  while (Date.now() - start < publishTimeoutMs) {
    if (await page.getByText(/stored publish result|publish request created/i).count()) {
      return
    }
    await delay(1500)
  }
  throw new Error('Timed out waiting for the publish result banner.')
}

async function showMockResult(page, options) {
  const successUrl = new URL('/tiktok-review', baseUrl)
  successUrl.searchParams.set('demo', 'mock')
  successUrl.searchParams.set('auth', 'connected')
  successUrl.searchParams.set('mode', options.mode)
  successUrl.searchParams.set('caption', options.caption)
  successUrl.searchParams.set('privacy', options.privacy)
  successUrl.searchParams.set('comments', options.comments ? '1' : '')
  successUrl.searchParams.set('duet', options.duet ? '1' : '')
  successUrl.searchParams.set('stitch', options.stitch ? '1' : '')
  successUrl.searchParams.set('consent', '1')
  successUrl.searchParams.set('publish', 'success')
  successUrl.searchParams.set('publish_id', `${options.publishIdPrefix}_${Date.now()}`)
  successUrl.searchParams.set('publish_status', options.publishStatus)
  if (options.postIdPrefix) {
    successUrl.searchParams.set('post_id', `${options.postIdPrefix}_${Date.now().toString().slice(-6)}`)
  }
  await page.goto(successUrl.toString(), { waitUntil: 'networkidle' })
}

async function selectPrivacyOption(privacySelect, allowedValues) {
  const optionValues = await privacySelect.locator('option').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('value') || '').filter(Boolean)
  )

  const selected = allowedValues.find((value) => optionValues.includes(value)) || optionValues[0] || ''
  if (selected) {
    await privacySelect.selectOption(selected)
  }
  return selected
}

async function ensurePostingMode(page, mode) {
  const currentMode = new URL(page.url()).searchParams.get('mode') || 'direct'
  if (currentMode === mode) {
    return
  }

  const linkName = mode === 'direct' ? /direct post/i : /upload as draft/i
  await Promise.all([
    page.waitForURL((url) => new URL(url).searchParams.get('mode') === mode, { timeout: 30_000 }),
    page.getByRole('link', { name: linkName }).click(),
  ])
}

async function maybeShowTikTokPost(page) {
  const currentUrl = new URL(page.url())
  const postId = currentUrl.searchParams.get('post_id') || ''
  const creatorHandleText = (
    await page
      .getByText('Creator account')
      .locator('xpath=..')
      .innerText()
      .catch(() => '')
  )
  const creatorHandle =
    creatorHandleText
      .split('\n')
      .map((value) => value.trim())
      .find((value) => value.startsWith('@'))
      ?.replace(/^@/, '') || ''

  const tiktokUrl =
    postId && creatorHandle
      ? `https://www.tiktok.com/@${creatorHandle}/video/${postId}`
      : 'https://www.tiktok.com/foryou'

  const tiktokPage = await page.context().newPage()
  await tiktokPage.goto(tiktokUrl, { waitUntil: 'networkidle' }).catch(() => {})
  await delay(5000)
  await tiktokPage.close().catch(() => {})
}

async function transcodeToMp4(inputPath, outputPath) {
  await new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-y',
      '-i',
      inputPath,
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      outputPath,
    ])

    let stderr = ''
    ffmpeg.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })
    ffmpeg.on('error', reject)
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new Error(`ffmpeg exited with code ${code}: ${stderr}`))
    })
  })
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
