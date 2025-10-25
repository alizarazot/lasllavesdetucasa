{
  description = "Inmobiliaria Las llaves de tu casa";
  inputs.nixpkgs.url = "github:nixos/nixpkgs/25.05";
  outputs = inputs @ {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
  in {
    devShells.${system}.default = let
      pkgs = nixpkgs.legacyPackages.${system};
    in
      pkgs.mkShell {
        packages = [
          pkgs.jdk
        ];
      };
  };
}
