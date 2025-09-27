{
  mkShellNoCC,

  # extra tooling
  eslint_d,
  prettierd,
  just,
  fastmod,
  nodejs,
  yarn,
  crowdin-cli,
  typescript,
  typescript-language-server,
  go,
  zulu17,

  callPackage,
}:

let
  defaultPackage = callPackage ./default.nix { };
in
mkShellNoCC {
  inputsFrom = [ defaultPackage ];

  packages = [
    eslint_d
    prettierd
    just
    fastmod
    nodejs
    yarn
    crowdin-cli
    typescript
    typescript-language-server
    go
    zulu17
  ];

  shellHook = ''
    eslint_d start
    eslint_d status
  '';
}
