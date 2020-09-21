<!--
SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

# GraphQL Cloudflare Worker for Factcheck Lab

Factcheck Lab uses this worker to forward GraphQL requests to backend servers.
The primary reason to have a Cloudflare Worker is to cache GraphQL requests that
are otherwise uncachable because GraphQL uses HTTP POST to send the request.

## Developing

### Requirements

* [Wrangler](https://github.com/cloudflare/wrangler)

### Configuration

The `wrangler.toml` file need to be created before deployment. See
`wrangler.toml.example` for example.

## Contributing

We welcome contributions to our projects! You can ask questions or [file a bug
report](https://gitlab.com/factchecklab/cloudflare-worker-graphql-api/-/issues/new) by creating an
issue on GitLab. To contribute, fork this repository on
GitLab and create a merge request.

## Getting Help

If you have questions, [file an issue](https://gitlab.com/factchecklab/cloudflare-worker-graphql-api/-/issues/new)
in our repository on GitLab, you can
also contact us at [tech@factchecklab.org](mailto:tech@factchecklab.org).

## Copyright & License

Copyright (c) 2020 tech@factchecklab.

The source code is licensed under Affero General Public License Version 3.
