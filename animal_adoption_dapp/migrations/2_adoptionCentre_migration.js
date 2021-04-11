const AdoptionCentre = artifacts.require("AdoptionCentre");
module.exports = async (deployer, network, accounts) => {
  //let myERC20Token = await deployer.deploy(MyERC20Token, 'Animal Coin', 'AnCoin', '10000');
  let adoptionCentre = await deployer.deploy(AdoptionCentre);
};    