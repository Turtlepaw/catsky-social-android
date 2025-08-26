# stolen from https://github.com/tgirlcloud/nix-templates/blob/main/node/default.nix
{ lib, buildNpmPackage }:

buildNpmPackage {
  pname = "catsky-social";
  version = "0.1.0";

  src = ./.;

  npmDepsHash = lib.fakeHash;

  meta = {
    description = "soft social-app fork with niche toggles stolen from deer/zepplin and catppuccin'd ";
    homepage = "https://github.com/NekoDrone/catsky-social";
    license = lib.licenses.mit;
    maintainers = with lib.maintainers; [ ];
    mainProgram = "example";
  };
}
