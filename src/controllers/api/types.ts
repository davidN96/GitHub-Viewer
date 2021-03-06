export interface User {
  login: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score?: number;
  contributions?: number;
}

export interface ExtendedUser extends User {
  name: null | string;
  company: null | string;
  blog: null | string;
  location: null | string;
  email: null | string;
  hireable: null | boolean;
  bio: null | string;
  twitter_username: null | string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export enum UserSortQuery {
  followers = 'followers',
  repositories = 'repositories',
  joined = 'joined',
}

export enum Order {
  desc = 'desc',
  asc = 'asc',
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: User;
  html_url: string;
  description: null | string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: null | string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: null | string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: null | License;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  score?: number;
}

export interface ExtendedRepository extends Repository {
  temp_clone_token: null | string;
  network_count: number;
  subscribers_count: number;
}

export enum RepositorySortQuery {
  stars = 'stars',
  forks = 'forks',
  updated = 'updated',
}

export enum UserRepoSortQuery {
  created = 'created',
  updated = 'updated',
  pushed = 'pushed',
  full_name = 'full_name',
}

export interface FindItemParams {
  perPage: number;
  page: number;
  sort?: string | null;
  order?: string | null;
  direction?: string;
}

export interface FindItemFullParams extends FindItemParams {
  q: string;
}

export interface FindItemResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[] | User[];
}

export interface CommitParticipant {
  name: string;
  email: string;
  date: string;
}

export interface CommitTree {
  sha: string;
  url: string;
}

export interface CommitVerification {
  verified: boolean;
  reason: string;
  signature: null | string;
  payload: null | string;
}

export interface CommitParent {
  sha: string;
  url: string;
  html_url: string;
}

export interface Commit {
  sha: string;
  node_id: string;
  commit: {
    author: CommitParticipant;
    committer: CommitParticipant;
    message: string;
    tree: CommitTree;
    url: string;
    comment_count: number;
    verification: CommitVerification;
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: User;
  committer: User;
  parents: CommitParent[];
}

export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

export interface RateLimitResponse {
  resources: {
    core: RateLimit;
    graphql: RateLimit;
    integration_manifest: RateLimit;
    search: RateLimit;
  };
  rate: RateLimit;
}
