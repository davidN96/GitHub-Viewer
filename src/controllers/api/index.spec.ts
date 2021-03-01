/**
 * @jest-environment node
 */

import GithubAPI from './index';
import GitHubAPI from './index';
import * as Types from './types';

const defaultUser: string = 'davidN96';
const defaultRepository: string = 'GitHub-Viewer';

describe.skip('getUser()', () => {
  it('Shuld return users info', async () => {
    const foundedUser: Types.ExtendedUser = await GitHubAPI.getUser(
      defaultUser
    );

    expect(foundedUser.login).toBe(defaultUser);
  });

  it("Shouldn't get user", async () => {
    const username: string = '$$$$';
    await GitHubAPI.getUser(username).catch(error => {
      expect(error.status).toBe(404);
    });
  });
});

describe.skip('findUser()', () => {
  it('Should find users with query', async () => {
    const params: Types.FindUserParams = {
      q: 'david',
      per_page: 5,
      page: 1,
      sort: Types.UserSortQuery.joined,
      order: Types.Order.asc,
    };

    const searchResult: Types.FindUserResponse = await GithubAPI.findUser(
      params
    );

    expect(searchResult.items.length).toBe(params.per_page);
  });
});

describe.skip('getRepository()', () => {
  it('Should get repository', async () => {
    const repository: Types.ExtendedRepository = await GithubAPI.getRepository(
      defaultUser,
      defaultRepository
    );

    expect(repository.name).toBe(defaultRepository);
  });
});

describe.skip('findRepository()', () => {
  it('Should find repository with query', async () => {
    const params: Types.FindRepositoryParams = {
      q: 'GitHub',
      per_page: 5,
      page: 1,
      sort: Types.RepositorySortQuery.stars,
      order: Types.Order.asc,
    };

    const searchResult: Types.FindRepositoryResponse = await GithubAPI.findRepository(
      params
    );

    expect(searchResult.items.length).toBe(params.per_page);
  });
});

describe.skip('getUserRepositories()', () => {
  it('Should return users repositories', async () => {
    const repositories: Types.Repository[] = await GithubAPI.getUserRepositories(
      defaultUser
    );

    expect(repositories.length).toBeGreaterThan(1);
  });
});

describe.skip('getRepositoryContributors()', () => {
  it('Should get repo contributors', async () => {
    const contributors: Types.Contributor[] = await GithubAPI.getRepositoryContributors(
      defaultUser,
      defaultRepository
    );

    expect(contributors.length).toBeGreaterThan(0);
  });
});

describe.skip('getUsersStarredProjects()', () => {
  it('Should return starred projects', async () => {
    const starredProjects: Types.Repository[] = await GithubAPI.getUserStarredProjects(
      defaultUser
    );

    expect(starredProjects.length).toBeGreaterThan(1);
  });
});

describe.skip('getUserFollowers()', () => {
  it('Should return user followers list', async () => {
    const followers: Types.User[] = await GithubAPI.getUserFollowers(
      defaultUser
    );

    expect(followers.length).toBeGreaterThan(0);
  });
});

describe.skip('getFollowedByUser()', () => {
  it('Should return users followed by user', async () => {
    const followed: Types.User[] = await GithubAPI.getFollowedByUser(
      defaultUser
    );

    expect(followed.length).toBeGreaterThan(0);
  });
});

describe.skip('getRepositoryCommits()', () => {
  it('Should return list of repo commits', async () => {
    const commits: Types.Commit[] = await GithubAPI.getRepositoryCommits(
      defaultUser,
      defaultRepository
    );

    expect(commits.length).toBeGreaterThan(2);
  });
});

describe.skip('getRateLimit()', () => {
  it('Should return limit', async () => {
    const limits: Types.RateLimitResponse = await GithubAPI.getRateLimit();

    expect(limits.rate.reset).toBeGreaterThan(0);
  });
});
