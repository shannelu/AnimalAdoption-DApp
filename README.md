# EECE 571G Term Project: Animadopt <img src="docs/DappLogo.JPEG" width="50">
Code & documentation for the EECE 571G term project: Animal Adoption DApp

Authored by Li Ju, Runze Wang, Shanny Lu, Shijun Shen


## Getting Started

Note: Make sure the version of **nvm** you are using is *v12.13.0*. If your nvm current version is not *v12.13.0*. Switch to version *12.13.0* by using
<code>
nvm use 12.13.0
</code>.

##### How to check your nvm version

```sh
$ nvm version
```

### 1. Clone Repository

```sh
$ git clone https://github.com/shannelu/AnimalAdoption-DApp.git
$ cd AnimalAdoption-DApp/animal_adoption_dapp
```
    
### 2. Install Dependencies

```sh
$ npm install
```
    
### 3. Run Dapp

##### Start up Ganache-cli or GUI

```sh
$ ./ganache-cli
```

##### Deploy contract
```sh
$  truffle migrate
```

##### Run Animal AdoptionRun Dapp
```sh
$ npm start
```
Browser will launch on [http://localhost:3000/signin](http://localhost:3000/signin).
