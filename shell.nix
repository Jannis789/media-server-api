{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.bun
    pkgs.git
  ];
  shellHook = ''
    echo "bun version $(bun --version)"
    echo "$(git --version)"
  '';
}