{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "media-server-dev-shell";

  buildInputs = [
    pkgs.bun
    pkgs.git
  ];

  shellHook = ''
    echo dev environment initiiert
    echo bun version $(bun --version)
    $(git --version)
  '';
}