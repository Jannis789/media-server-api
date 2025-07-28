{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.bun
    pkgs.git
    pkgs.stdenv.cc.cc  # für libstdc++.so.6
  ];
  shellHook = ''
    export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:${pkgs.stdenv.cc.cc.lib}/lib"
    echo "bun version $(bun --version)"
    echo "$(git --version)"
  '';
}