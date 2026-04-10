import { cookies } from 'next/headers'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Film,
  Music4,
  PlayCircle,
  ShieldAlert,
  ShieldCheck,
  Upload,
  UserRound,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  fetchTikTokCreatorInfo,
  fetchTikTokUserProfile,
  fetchTikTokVideos,
  isTikTokSessionExpiring,
  TIKTOK_SESSION_COOKIE,
  TikTokCreatorInfo,
  TikTokUserProfile,
  TikTokVideo,
  unsealTikTokSession,
} from '@/lib/tiktok'

export const dynamic = 'force-dynamic'

type PostingMode = 'direct' | 'draft'

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

type ReviewVideo = {
  id: string
  title: string
  views: string
  comments: string
  engagementRate: string
  publishedAt: string
  duration: string
}

const fallbackVideos: ReviewVideo[] = [
  {
    id: '7219552480132980014',
    title: 'Why restaurant operators are moving from reports to real-time intelligence',
    views: '18.4K',
    comments: '126',
    engagementRate: '7.8%',
    publishedAt: 'Recent post',
    duration: '00:42',
  },
  {
    id: '7219552480132980015',
    title: '3 margin leaks hidden in your shift-by-shift data',
    views: '12.1K',
    comments: '89',
    engagementRate: '6.4%',
    publishedAt: 'Recent post',
    duration: '00:37',
  },
  {
    id: '7219552480132980016',
    title: 'How multi-unit teams use Sundae to benchmark campaign lift by location',
    views: '9.7K',
    comments: '58',
    engagementRate: '5.9%',
    publishedAt: 'Recent post',
    duration: '00:54',
  },
]

const publishTimeline = [
  'Starting TikTok draft request',
  'Uploading the approved MP4 to TikTok',
  'TikTok returns a publish_id to Sundae',
  'Creator continues from TikTok Activity',
]

const defaultCaption =
  'Restaurant operators do not need more dashboards. They need one command center that connects campaigns to traffic, check averages, and margin lift. #RestaurantIntelligence #TikTokForBusiness #Sundae'

export default async function TikTokReviewPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = normalizeQuery(params)
  const mockMode = query.demo === 'mock'

  const cookieStore = await cookies()
  const session = unsealTikTokSession(cookieStore.get(TIKTOK_SESSION_COOKIE)?.value)

  const mockConnected = mockMode && query.auth === 'connected'
  const authConnected = query.auth === 'connected'
  const authDisconnected = query.auth === 'disconnected'
  const authError = query.auth === 'error' ? query.error : ''
  const publishSuccess = query.publish === 'success'
  const publishError = query.publish === 'error' ? query.error : ''

  const postingMode: PostingMode = query.mode === 'direct' ? 'direct' : 'draft'
  const caption = query.caption || defaultCaption
  const consent = query.consent === '1'
  const allowComments = query.comments === '1'
  const allowDuet = query.duet === '1'
  const allowStitch = query.stitch === '1'

  let profile: TikTokUserProfile | null = null
  let videos: TikTokVideo[] = []
  let creatorInfo: TikTokCreatorInfo | null = null
  let dataWarning = ''
  const grantedScopes = new Set((session?.scope || '').split(',').map((value) => value.trim()).filter(Boolean))

  if (mockConnected) {
    profile = mockProfile
    videos = mockVideos
    creatorInfo = mockCreatorInfo
    dataWarning =
      'Mock sandbox mode is enabled on the real Sundae website because TikTok sandbox login is temporarily rate-limited. The recording still demonstrates the full in-app review flow.'
  } else if (session) {
    if (isTikTokSessionExpiring(session, 30 * 1000)) {
      dataWarning = 'The TikTok access token is expiring. Reconnect the sandbox account before recording a final review video.'
    } else {
      const shouldFetchProfile = grantedScopes.has('user.info.basic')
      const includeProfileStats = grantedScopes.has('user.info.stats')
      const shouldFetchVideos = grantedScopes.has('video.list')
      const shouldFetchCreatorInfo = grantedScopes.has('video.publish')

      const [profileResult, videoResult, creatorResult] = await Promise.allSettled([
        shouldFetchProfile ? fetchTikTokUserProfile(session.accessToken, includeProfileStats) : Promise.resolve(null),
        shouldFetchVideos ? fetchTikTokVideos(session.accessToken) : Promise.resolve([]),
        shouldFetchCreatorInfo ? fetchTikTokCreatorInfo(session.accessToken) : Promise.resolve(null),
      ])

      if (profileResult.status === 'fulfilled' && profileResult.value) {
        profile = profileResult.value
      } else if (profileResult.status === 'rejected') {
        dataWarning = profileResult.reason instanceof Error ? profileResult.reason.message : 'TikTok profile data could not be loaded.'
      }

      if (videoResult.status === 'fulfilled' && videoResult.value.length > 0) {
        videos = videoResult.value
      } else if (videoResult.status === 'rejected' && !dataWarning) {
        dataWarning = videoResult.reason instanceof Error ? videoResult.reason.message : 'TikTok video data could not be loaded.'
      }

      if (creatorResult.status === 'fulfilled' && creatorResult.value) {
        creatorInfo = creatorResult.value
      } else if (creatorResult.status === 'rejected' && !dataWarning) {
        dataWarning = creatorResult.reason instanceof Error ? creatorResult.reason.message : 'TikTok creator publishing settings could not be loaded.'
      }
    }
  }

  const connected = Boolean(session) || mockConnected
  const creatorLabel = getCreatorLabel(profile, creatorInfo, session?.openId)
  const creatorHandle = getCreatorHandle(creatorInfo, session?.openId)
  const creatorAvatar = creatorInfo?.creator_avatar_url || profile?.avatar_url || ''
  const recentVideos = connected && videos.length > 0 ? videosToReviewCards(videos) : fallbackVideos
  const latestVideo = recentVideos[0]

  const publishedVideo = publishSuccess
      ? {
        id: query.publish_id || 'pending-publish-id',
        mode: postingMode,
        privacyLevel: postingMode === 'draft' ? 'TikTok draft' : formatPrivacyLabel(query.privacy || ''),
        commentsEnabled: allowComments,
        duetEnabled: allowDuet,
        stitchEnabled: allowStitch,
        status: query.publish_status || (postingMode === 'draft' ? 'DRAFT_UPLOADED' : 'PUBLISH_INITIATED'),
        postId: query.post_id || '',
      }
    : null
  const draftContinuationUrl = 'https://www.tiktok.com/inbox?lang=en'

  const commandCenterHighlights = [
    { label: 'Connected Account', value: connected ? creatorHandle : 'Awaiting connection' },
    { label: 'Approved Scope', value: connected ? 'user.info.basic' : 'Login required' },
    {
      label: 'Latest Upload',
      value:
        publishedVideo
          ? `Draft upload · ${publishedVideo.status}`
          : 'No publish in this session',
    },
    { label: 'Next Creator Step', value: publishedVideo ? 'Open TikTok Activity' : 'Send draft to TikTok' },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1033a7_0%,#08142f_32%,#030712_80%)]">
      <section className="relative overflow-hidden px-4 pb-12 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            TikTok Sandbox Review Demo
          </div>

          <div className="mt-6 space-y-3">
            {authConnected && (
              <StatusBanner
                tone="success"
                title="TikTok sandbox account connected"
                body="Login Kit completed successfully and Sundae can now show the connected TikTok identity and send approved videos into TikTok draft flow."
              />
            )}
            {authDisconnected && (
              <StatusBanner
                tone="neutral"
                title="TikTok sandbox account disconnected"
                body="The local TikTok session has been cleared from Sundae."
              />
            )}
            {authError && (
              <StatusBanner tone="error" title="TikTok authorization issue" body={authError} />
            )}
            {publishSuccess && publishedVideo && (
              <StatusBanner
                tone="success"
                title="TikTok publish request created"
                body={`Publish ID ${publishedVideo.id} was returned by TikTok. Sundae stored the draft-upload request and surfaced the status in the command center below.`}
              />
            )}
            {publishError && <StatusBanner tone="error" title="TikTok publish issue" body={publishError} />}
            {dataWarning && <StatusBanner tone="warning" title="TikTok data note" body={dataWarning} />}
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Website flow for TikTok Login Kit and upload-to-draft inside Sundae.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                This page is designed for TikTok app review. It shows the actual Sundae website experience: sandbox
                authorization, the connected TikTok creator identity, an approved video asset, a real upload-to-draft
                request, and the TikTok Activity handoff where the creator continues editing in TikTok.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
                <Badge>Product: Login Kit</Badge>
                <Badge>Product: Content Posting API</Badge>
                <Badge>Scope: user.info.basic</Badge>
                <Badge>Scope: video.upload</Badge>
              </div>
            </div>

            <Card variant="glow" className="self-start">
              <CardHeader className="mb-0">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 text-cyan-200">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Review Checklist</CardTitle>
                    <CardDescription className="text-slate-300">
                      Everything on this page is visible in the browser for the demo recording.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-200">
                <ChecklistItem text="Shows the connected TikTok creator identity returned by Login Kit." />
                <ChecklistItem text="Shows the approved video asset and caption inside the actual Sundae website." />
                <ChecklistItem text="Shows a real video.upload request returning a TikTok publish_id back into Sundae." />
                <ChecklistItem text="Shows the creator opening TikTok Activity to continue the draft in TikTok." />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            <div id="connect">
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white">1. Connect TikTok Sandbox</CardTitle>
                    <CardDescription className="text-slate-300">
                      Login Kit is used to authorize the TikTok creator account and return user access scopes to the website.
                    </CardDescription>
                  </div>
                  <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                    Sandbox
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#25F4EE] via-[#111827] to-[#FE2C55]">
                      {creatorAvatar ? (
                        <span className="flex h-full w-full items-center justify-center bg-slate-900 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                          Avatar
                        </span>
                      ) : (
                        <Music4 className="h-7 w-7 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm uppercase tracking-[0.18em] text-white/50">Authorized creator</div>
                      <div className="mt-1 text-lg font-semibold text-white">{connected ? creatorLabel : 'No TikTok creator connected yet'}</div>
                      <div className="mt-1 text-sm text-slate-300">
                        {connected
                          ? 'Login Kit granted user.info.basic and Content Posting access to this website session.'
                          : 'Start the sandbox login flow to connect the TikTok creator profile.'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {['user.info.basic', 'video.upload'].map((scope) => (
                    <div
                      key={scope}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100"
                    >
                      {scope}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {!connected ? (
                    <Button href={mockMode ? '/tiktok-review?demo=mock&auth=connected' : '/api/auth/tiktok?next=/tiktok-review&scopeSet=upload-review'}>
                      Connect TikTok with Login Kit
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    mockMode ? (
                      <Button variant="outline-light" href="/tiktok-review?demo=mock&auth=disconnected">
                        Disconnect mock sandbox account
                      </Button>
                    ) : (
                      <form action="/api/auth/tiktok/disconnect?next=/tiktok-review" method="post">
                        <Button type="submit" variant="outline-light">
                          Disconnect sandbox account
                        </Button>
                      </form>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
            </div>

            <div id="account">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-white">2. Confirm the Connected Creator in Sundae</CardTitle>
                <CardDescription className="text-slate-300">
                  The reviewer can see the connected TikTok creator identity inside the actual Sundae website before the upload starts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <StatPill label="Display Name" value={connected ? creatorLabel : 'Locked'} tone="accent" />
                  <StatPill label="TikTok Handle" value={connected ? creatorHandle : 'Locked'} />
                  <StatPill label="Approved Scope" value={connected ? 'user.info.basic' : 'Locked'} />
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <div className="flex gap-4">
                    <div className="relative flex h-24 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/60 via-slate-900 to-cyan-400/50">
                      <PlayCircle className="h-8 w-8 text-white/90" />
                      <div className="absolute bottom-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-white">
                        {latestVideo?.duration || '00:42'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm uppercase tracking-[0.18em] text-white/45">Approved review asset</div>
                      <div className="mt-1 font-semibold text-white">
                        {latestVideo?.title || 'Why restaurant operators are moving from reports to real-time intelligence'}
                      </div>
                      <div className="mt-3 text-sm leading-6 text-slate-300">
                        This approved MP4 is selected inside Sundae and sent to TikTok using the Content Posting API upload-to-draft flow.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div id="composer">
            <Card variant="elevated">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-white">3. Review and Send Draft in the Website</CardTitle>
                    <CardDescription className="text-slate-300">
                      Sundae sends the approved video into TikTok draft flow so the creator can continue editing in TikTok.
                    </CardDescription>
                  </div>
                  <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                    Website composer
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[28px] border border-white/10 bg-[#0b1021] p-4">
                    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-[#101f4d]">
                      <div className="aspect-[9/16] w-full">
                        <div className="flex h-full flex-col justify-between p-5">
                          <div className="w-fit rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-100">
                            Approved asset
                          </div>
                          <div>
                            <div className="rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur">
                              <div className="text-xs uppercase tracking-[0.18em] text-white/55">Preview</div>
                              <div className="mt-2 text-lg font-semibold text-white">
                                Decision intelligence for restaurant operators
                              </div>
                              <div className="mt-2 text-sm leading-6 text-slate-300">
                                Operator-facing explainer video rendered by Sundae Marketing and sent to TikTok through the Content Posting API from this website.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form action="/api/auth/tiktok/publish" method="post" className="space-y-4">
                    <input type="hidden" name="next" value="/tiktok-review" />
                    <input type="hidden" name="mode" value="draft" />
                    <input type="hidden" name="demo" value={mockMode ? 'mock' : ''} />
                    <input type="hidden" name="privacy" value="SELF_ONLY" />

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="flex items-center gap-3">
                        <UserRound className="h-5 w-5 text-cyan-200" />
                        <div>
                          <div className="text-sm uppercase tracking-[0.18em] text-white/50">Creator account</div>
                          <div className="text-base font-semibold text-white">
                            {connected ? creatorHandle : 'Connect a TikTok sandbox account first'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-cyan-200" />
                        <div>
                          <div className="text-sm uppercase tracking-[0.18em] text-white/50">TikTok capability in review</div>
                          <div className="mt-1 text-base font-semibold text-white">Upload as draft</div>
                          <div className="mt-2 text-sm leading-6 text-slate-300">
                            This review flow uses the included <span className="font-semibold text-white">video.upload</span> capability. Sundae sends the approved video into TikTok draft flow, then the creator continues from TikTok Activity.
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="block rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-sm uppercase tracking-[0.18em] text-white/50">Title and caption</div>
                      <textarea
                        name="caption"
                        defaultValue={caption}
                        className="mt-3 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/50"
                      />
                    </label>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="text-sm uppercase tracking-[0.18em] text-white/50">What happens next</div>
                      <div className="mt-3 text-sm leading-7 text-slate-200">
                        Sundae uploads the approved MP4 and receives a TikTok <span className="font-semibold text-white">publish_id</span>.
                        The creator then opens TikTok Activity and continues editing from TikTok&apos;s draft flow.
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-3xl border border-white/10 bg-black/20 p-5 text-sm text-slate-200">
                      <input
                        type="checkbox"
                        name="consent"
                        value="1"
                        defaultChecked={consent}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
                      />
                      <span>
                        By posting, you agree to TikTok&apos;s Music Usage Confirmation. This consent checkbox remains off by default and must be selected by the user.
                      </span>
                    </label>

                    <div className="flex flex-wrap gap-3">
                      <Button type="submit" disabled={!connected}>
                        Send draft to TikTok
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline-light" href={mockMode ? '/tiktok-review?demo=mock' : '/tiktok-review'}>
                        Reset page state
                      </Button>
                    </div>

                    {!connected && (
                      <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                        Connect the sandbox creator account before submitting the post form.
                      </div>
                    )}
                  </form>
                </div>
              </CardContent>
            </Card>
            </div>

            <div id="status">
            <Card variant="glow">
              <CardHeader>
                <CardTitle className="text-white">4. Draft Status and TikTok Handoff</CardTitle>
                <CardDescription className="text-slate-300">
                  After upload starts, Sundae stores the TikTok response and shows the next action back in the command center.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {commandCenterHighlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-white/45">{item.label}</div>
                      <div className="mt-2 text-base font-semibold text-white">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-3">
                      <Clock3 className="h-5 w-5 text-cyan-200" />
                      <div className="text-base font-semibold text-white">Current publish session</div>
                    </div>
                    <div className="mt-5 space-y-4">
                      {publishTimeline.map((label, index) => {
                        const active = publishedVideo ? true : false
                        return (
                          <div key={label} className="flex gap-4">
                            <div
                              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                                active
                                  ? 'border-cyan-300/50 bg-cyan-400/20 text-cyan-100'
                                  : 'border-white/10 bg-white/5 text-white/45'
                              }`}
                            >
                              {active ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                            </div>
                            <div>
                              <div className={`font-semibold ${active ? 'text-white' : 'text-white/55'}`}>{label}</div>
                              <div className={`mt-1 text-sm leading-6 ${active ? 'text-slate-300' : 'text-white/35'}`}>
                              {timelineHelper(index)}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-3">
                      <Film className="h-5 w-5 text-fuchsia-200" />
                      <div className="text-base font-semibold text-white">Latest TikTok record in Sundae</div>
                    </div>
                    {publishedVideo ? (
                      <div className="mt-5 space-y-3 rounded-3xl border border-cyan-300/20 bg-cyan-400/10 p-5">
                        <div className="text-sm uppercase tracking-[0.18em] text-cyan-100">Stored publish result</div>
                        <div className="text-xl font-semibold text-white">{publishedVideo.id}</div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <MiniFact label="Mode" value="Upload as draft" />
                          <MiniFact label="Privacy" value="TikTok draft" />
                          <MiniFact label="TikTok Status" value={publishedVideo.status} />
                          <MiniFact label="Public Post ID" value={publishedVideo.postId || 'Awaiting public post id'} />
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200">
                          Sundae stores the TikTok publish_id and draft status so the team can confirm the handoff succeeded before the creator finishes the post in TikTok.
                        </div>
                        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-50">
                          <div className="font-semibold text-white">Next creator step after opening TikTok</div>
                          <div className="mt-2 leading-6 text-amber-50/90">
                            The upload-to-draft request is complete inside Sundae. The creator then opens TikTok, taps the
                            system notification in Activity, and continues editing there to finish the post from TikTok&apos;s draft flow.
                          </div>
                          <div className="mt-3">
                            <Button variant="outline-light" href={draftContinuationUrl}>
                              Open TikTok Activity
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 rounded-3xl border border-dashed border-white/15 bg-black/20 p-8 text-center text-slate-300">
                        Send a draft to TikTok to populate the command center record.
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle className="text-white">Recommended App Review Text</CardTitle>
                <CardDescription className="text-slate-300">
                  Copy this into TikTok for Developers after you confirm the selected products and scopes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-slate-100">
{`Sundae Marketing is a web-based content operations platform for restaurant and hospitality marketing teams. The demo begins on the Sundae website at sundaetech.ai, where the user clicks Connect TikTok. TikTok then opens its authorization screen because Login Kit is used to grant access back to the Sundae website. user.info.basic shows the connected TikTok identity in our UI after the user returns to Sundae. Content Posting API is used to send an approved short-form video from Sundae to TikTok as a draft. The user reviews the approved asset and caption inside the Sundae website, selects consent, and clicks Send draft to TikTok. Sundae receives the TikTok publish_id, stores the draft status in our command center, and shows the next step in the website UI. The creator then opens TikTok Activity, taps the system notification, and continues editing there to finish the post from TikTok's draft flow.`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

function normalizeQuery(params?: Record<string, string | string[] | undefined>) {
  const query: Record<string, string> = {}
  for (const [key, value] of Object.entries(params || {})) {
    query[key] = Array.isArray(value) ? value[0] || '' : value || ''
  }
  return query
}

function getCreatorLabel(profile: TikTokUserProfile | null, creatorInfo: TikTokCreatorInfo | null, openId?: string) {
  return creatorInfo?.creator_nickname || profile?.display_name || getCreatorHandle(creatorInfo, openId)
}

function getCreatorHandle(creatorInfo: TikTokCreatorInfo | null, openId?: string) {
  if (creatorInfo?.creator_username) return `@${creatorInfo.creator_username}`
  if (openId) return `TikTok user ${openId.slice(-6)}`
  return '@sandbox-creator'
}

const mockProfile: TikTokUserProfile = {
  open_id: 'mock-sandbox-open-id',
  display_name: 'Sundae Mock Creator',
  follower_count: 28431,
  following_count: 214,
  likes_count: 163905,
  video_count: 48,
}

const mockCreatorInfo: TikTokCreatorInfo = {
  creator_username: 'sundae_mock',
  creator_nickname: 'Sundae Mock Creator',
  privacy_level_options: ['PUBLIC_TO_EVERYONE', 'MUTUAL_FOLLOW_FRIENDS', 'SELF_ONLY'],
  comment_disabled: false,
  duet_disabled: false,
  stitch_disabled: false,
  max_video_post_duration_sec: 600,
}

const mockVideos: TikTokVideo[] = [
  {
    id: 'mock-video-1',
    title: 'How restaurant teams connect spend to store traffic',
    duration: 42,
    view_count: 18420,
    like_count: 1137,
    comment_count: 126,
    share_count: 182,
  },
  {
    id: 'mock-video-2',
    title: '3 margin leaks hidden in your shift-by-shift data',
    duration: 37,
    view_count: 12104,
    like_count: 774,
    comment_count: 89,
    share_count: 104,
  },
  {
    id: 'mock-video-3',
    title: 'Benchmark campaign lift by location with Sundae',
    duration: 54,
    view_count: 9718,
    like_count: 551,
    comment_count: 58,
    share_count: 71,
  },
]

function videosToReviewCards(videos: TikTokVideo[]): ReviewVideo[] {
  return videos.slice(0, 6).map((video, index) => {
    const views = typeof video.view_count === 'number' ? video.view_count : 0
    const likes = typeof video.like_count === 'number' ? video.like_count : 0
    const comments = typeof video.comment_count === 'number' ? video.comment_count : 0
    const shares = typeof video.share_count === 'number' ? video.share_count : 0
    const interactions = likes + comments + shares
    const engagementRate = views > 0 ? `${((interactions / views) * 100).toFixed(1)}%` : '0.0%'

    return {
      id: video.id,
      title: video.title || video.video_description || `TikTok video ${index + 1}`,
      views: formatCount(views),
      comments: formatCount(comments),
      engagementRate,
      publishedAt: `Video ${index + 1}`,
      duration: formatDuration(video.duration),
    }
  })
}

function formatCount(value?: number | null) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '0'
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return String(value)
}

function formatDuration(value?: number) {
  if (!value || value <= 0) return '00:00'
  const minutes = Math.floor(value / 60)
  const seconds = value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function formatPrivacyLabel(value: string) {
  switch (value) {
    case 'PUBLIC_TO_EVERYONE':
      return 'Public to everyone'
    case 'MUTUAL_FOLLOW_FRIENDS':
      return 'Mutual followers only'
    case 'FOLLOWER_OF_CREATOR':
      return 'Followers only'
    case 'SELF_ONLY':
      return 'Only me'
    default:
      return value || 'Choose privacy level'
  }
}

function timelineHelper(index: number) {
  switch (index) {
    case 0:
      return 'Sundae validates the selected creator, checks publishing limits, and creates the TikTok publish job.'
    case 1:
      return 'The approved MP4 is uploaded to TikTok using the Content Posting API.'
    case 2:
      return 'TikTok finishes the media pipeline and returns publish status to our command center.'
    default:
      return 'We store the publish result and surface the video inside Sundae for performance tracking.'
  }
}

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{children}</div>
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
      <span>{text}</span>
    </div>
  )
}

function StatPill({ label, value, tone = 'neutral' }: { label: string; value: string; tone?: 'neutral' | 'accent' }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        tone === 'accent'
          ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
          : 'border-white/10 bg-white/5 text-white'
      }`}
    >
      <div className="text-xs uppercase tracking-[0.18em] text-white/55">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  )
}

function MiniFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
    </div>
  )
}

function StatusBanner({
  tone,
  title,
  body,
}: {
  tone: 'success' | 'warning' | 'error' | 'neutral'
  title: string
  body: string
}) {
  const toneClass =
    tone === 'success'
      ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-50'
      : tone === 'warning'
        ? 'border-amber-300/20 bg-amber-300/10 text-amber-50'
        : tone === 'error'
          ? 'border-rose-300/20 bg-rose-300/10 text-rose-50'
          : 'border-cyan-300/20 bg-cyan-300/10 text-cyan-50'

  const Icon = tone === 'warning' || tone === 'error' ? ShieldAlert : ShieldCheck

  return (
    <div className={`rounded-3xl border px-5 py-4 ${toneClass}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5" />
        <div>
          <div className="font-semibold">{title}</div>
          <div className="mt-1 text-sm leading-6 text-inherit/85">{body}</div>
        </div>
      </div>
    </div>
  )
}
