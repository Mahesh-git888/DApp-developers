// src/Screen.jsx
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import MicrofinanceABI from "./contracts/Microfinance.json";
import './Screen.css'; // Import the CSS file

function Screen() {
    const [account, setAccount] = useState("");
    const [profile, setProfile] = useState({ name: "", address: "", balance: 0 });
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const loadBlockchainData = async () => {
            setLoading(true);
            setError("");
            setSuccessMessage("");
            try {
                const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
                const accounts = await web3.eth.requestAccounts();
                setAccount(accounts[0]);

                const networkId = await web3.eth.net.getId();
                const contractData = MicrofinanceABI.networks[networkId];
                if (contractData) {
                    const microfinance = new web3.eth.Contract(MicrofinanceABI.abi, contractData.address);
                    setContract(microfinance);

                    const userProfile = await microfinance.methods.getUserProfile(accounts[0]).call();
                    setProfile({
                        name: userProfile[0],
                        address: userProfile[1],
                        balance: web3.utils.fromWei(userProfile[2], 'ether')
                    });
                } else {
                    setError("Smart contract not deployed to the detected network.");
                }
            } catch (err) {
                setError("Failed to load contract or account information.");
                console.error(err);
            }
            setLoading(false);
        };

        loadBlockchainData();
    }, []);

    const updateName = async () => {
        if (!contract || !name) return;
        setLoading(true);
        setError("");
        setSuccessMessage("");
        try {
            await contract.methods.setUserProfile(name).send({ from: account });
            const userProfile = await contract.methods.getUserProfile(account).call();
            setProfile({
                name: userProfile[0],
                address: userProfile[1],
                balance: web3.utils.fromWei(userProfile[2], 'ether')
            });
            setSuccessMessage("Successfully Updated Profile");
        } catch (err) {
            setError("Failed to update profile.");
            console.error(err);
        }
        setLoading(false);
    };

    const addBalance = async () => {
        if (!contract || isNaN(amount) || parseFloat(amount) <= 0) return;
        setLoading(true);
        setError("");
        setSuccessMessage("");
        try {
            await contract.methods.addBalance(web3.utils.toWei(amount, 'ether')).send({ from: account });
            const userProfile = await contract.methods.getUserProfile(account).call();
            setProfile({
                name: userProfile[0],
                address: userProfile[1],
                balance: web3.utils.fromWei(userProfile[2], 'ether')
            });
            setSuccessMessage("Successfully Added Balance");
        } catch (err) {
            setError("Failed to add balance.");
            console.error(err);
        }
        setLoading(false);
    };

    const uploadProfile = async () => {
        if (!contract || !name || isNaN(amount) || parseFloat(amount) <= 0) return;
        setLoading(true);
        setError("");
        setSuccessMessage("");
        try {
            await contract.methods.setUserProfile(name).send({ from: account });
            await contract.methods.addBalance(web3.utils.toWei(amount, 'ether')).send({ from: account });

            const userProfile = await contract.methods.getUserProfile(account).call();
            setProfile({
                name: userProfile[0],
                address: userProfile[1],
                balance: web3.utils.fromWei(userProfile[2], 'ether')
            });

            setSuccessMessage("Successfully Uploaded Profile and Added Balance");
        } catch (err) {
            setError("Failed to upload profile and add balance.");
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="screen-container">
            <h1>Microfinance Dashboard</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <p><strong>Account:</strong> {account}</p>
            <div>
                <h3>User Profile</h3>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Balance:</strong> {profile.balance} ETH</p>
            </div>
            <div>
                <h3>Update Profile</h3>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={updateName} disabled={loading}>Update Name</button>
            </div>
            <div>
                <h3>Add Balance</h3>
                <input
                    type="number"
                    placeholder="Amount in ETH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={addBalance} disabled={loading}>Add Balance</button>
            </div>
            <div>
                <h3>Upload Profile and Balance</h3>
                <button onClick={uploadProfile} disabled={loading}>Upload</button>
            </div>
        </div>
    );
}

export default Screen;
