const AdoptionCentre = artifacts.require("AdoptionCentre");

module.exports = async (deployer, network, accounts) => {
  let adoptionCentre = await deployer.deploy(AdoptionCentre, 'Adoption Centre', 'Group 8', '10000');
};