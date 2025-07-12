{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "media-server-dev-shell";

  buildInputs = [
    pkgs.nodejs
    pkgs.supabase-cli  # optional, falls du lieber das nix-Paket nehmen willst
    pkgs.docker
    pkgs.docker-compose
    pkgs.git
    pkgs.ffmpeg
    pkgs.playwright-driver
  ];

  shellHook = ''
    echo "🚀 Media Server Dev-Shell bereit"
    echo "📦 Node version: $(node -v)"
    echo "📦 NPM version:  $(npm -v)"
    echo "📦 Docker version: $(docker --version || echo 'nicht installiert')"
    echo "📦 Docker Compose version: $(docker-compose --version || echo 'nicht installiert')"
    echo "📦 FFmpeg version: $(ffmpeg -version | head -n1)"
    echo "💡 installiere Less und Supabase lokal im Projekt:"
    npm install --save-dev less supabase
  '';
}

