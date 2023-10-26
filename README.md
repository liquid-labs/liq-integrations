# liq-integrations

Enables integrations plugins for [plugable-express](https://github.com/liquid-labs/plugable-express) based servers.

## Installation

From a plugable express server:

```bash
catalyst server plugins handlers add -- npmName=@liquid-labs/liq-integrations
```

Where 'catalyst' may be replaced by the CLI for the particular pluggable server.

## Usage

Once installed, you can then install integrations like this:

```bash
catalyst server plugins integrations add -- npmName=@liquid-labs/liq-integrations-issues-github
```

Where 'catalyst' may be replaced by the CLI for the particular pluggable server.

## Integrations overview

This section is aimed primarily at those seeking a deeper understanding of how integrations work; e.g., integration developers. Casual users can skip this section.

### Structure

An integration spec defines a single integration:

- `hooks`: an object containing hook functions referenced by name. The hook functions are what are ultimately executed by `IntegrationsManager.callHook()`. Every integration which is a `providerFor` a particular thing will define the same set of hooks. The hooks are "what the integration can do".
- `name`: a simple name describing the integration spec. (The use of `name` is still in flux and may be dropped.)
- `npmName`: the name of the package providing the integrations.
- `providerFor`: a noun or verb naming the thing (e.g. 'tickets'). The `providerFor` value is used by `IntegrationsManager.callHook()` to for first-level selection of possible integration providers.
- `providerTest`: a test function which decides whether this integration fits this project. The provider test always receives `pkgJSON`, which is the `package.json` value for the project being acted upon and may receive additional arguments depending on the `providerFor` type.

### Flow

1. 'liq-integrations' `setup()` adds sets up `app.ext.integrations = new IntegrationsManager()`.
2. 'lig-integrations' `setup()` calls the `registerIntegrationsPlugin()` function exported by each installed integrations plugin package. Each plugin registers its integrations.
3. When an integration is required (e.g., to create a pull request), instead of calling a function directly, `IntegrationsManager.callHook()` is invoked with the following parameters:
  - `providerFor`: a string naming the integration basic domain / purpose (e.g., 'pull requests')
  - `providerArgs`: a parameter object containing the `pkgJSON` for the project in question and (depending on the `providerFor` type) possibly additional arguments.
  - `hook`: the name of the specific hook in the integrations to be invoked (e.g., 'createOrUpdatePullRequest').
  - `hookArgs`: a parameter object containing arguments particular to the `hook`.
4. The `IntegrationsManager.callHook()` will filter the available integrations based on `providerFor` and then the itnegaritons `providerTest`. Once found, the integrations `hook` is invoked with the caller's `hookArgs`. If no applicable integration is found, then an exception is raised.

Note in theory, it would be possible to find an integration based on the `hook` name alone but we retain `providerFor` as it clarifies things and to make determination of `providerArgs` cotnent more clear in particular. There is also the thought that it helps avoid `hook` name collisions in future.