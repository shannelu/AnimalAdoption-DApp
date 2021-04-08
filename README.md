# EECE 571G Term Project
Code & documentation for the EECE 571G term project: Animal Adoption DApp

Authored by Li Ju, Runze Wang, Shanny Lu, Shijun Shen

## How to power up backend

### Start up Ganache-cli or GUI

<code>
./ganache-cli
</code>

### Deploy contract

<code>
cd ./animal_adoption_dapp && truffle migrate
</code>

### How to create an Agent object

<code> 
let myAgent = new Agent();
</code>

<code> 
myAgent.initialize(contractAddress);
</code>

### How to use Agent's functions

Sample code is in the App.js file.

### TODO:
1. Page Transition (Done);
2. Solve the Array related bugs;
3. CSS
4. ...
