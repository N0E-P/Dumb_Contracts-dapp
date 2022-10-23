import * as React from "react"
import { ethers } from "ethers"
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi"

import contractABI from "../contract/ABI.json"
const contractAddress = require("../contract/ADDRESS.json")["goerli"][0]

export default function Create() {
	const [_name, setName] = React.useState("")
	const [_text, setText] = React.useState("")
	const [_user2, setUser2] = React.useState("")
	const [_collateral, setCollateral] = React.useState("")
	const [_amountFromUser1ToUser2, setAmountFromUser1ToUser2] = React.useState("0")
	const [_amountFromUser2ToUser1, setAmountFromUser2ToUser1] = React.useState("0")

	const { config } = usePrepareContractWrite({
		address: "0x30BEbc4e1094cA707bD203b87e5a7358076a1254",
		abi: contractABI,
		functionName: "createAContract",
		overrides: {
			from: "0x30BEbc4e1094cA707bD203b87e5a7358076a1254",
			value: ethers.utils.parseEther(
				_collateral + _amountFromUser1ToUser2
			) /*VARIABLES.toString "1" */,
		},
		args: [_name, _text, _user2, _collateral, _amountFromUser1ToUser2, _amountFromUser2ToUser1],
		onSuccess() {
			console.log("usePrepareContractWrite done")
		},
		onError(error) {
			console.log("Error", error)
		},
	})

	const { data, isLoading, isSuccess, write } = useContractWrite(config)

	return (
		<div>
			<h2>Create a Dumb Contract</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					write?.()
				}}
			>
				<div>
					<label for="Name">
						<h4>Contract name: </h4>
					</label>
					<input
						id="Name"
						onChange={(e) => setName(e.target.value)}
						placeholder="My Dumb Contract"
						value={_name}
					/>
				</div>
				<div>
					<label for="Text">
						<h4>What it does: </h4>
					</label>
					<input
						id="Text"
						onChange={(e) => setText(e.target.value)}
						placeholder="Pay Patrick for his service"
						value={_text}
					/>
				</div>
				<div>
					<label for="User2">
						<h4>Second User Ethereum address: </h4>
					</label>
					<input
						id="User2"
						onChange={(e) => setUser2(e.target.value)}
						placeholder="0x21a2...357e4"
						value={_user2}
					/>
				</div>
				<div>
					<label for="Collateral">
						<h4>Collateral in ETH: </h4>
					</label>
					<input
						id="Collateral"
						onChange={(e) => setCollateral(e.target.value)}
						placeholder=" > 0.01"
						value={_collateral}
					/>
				</div>
				<div>
					<label for="AmountFromUser1ToUser2">
						<h4>ETH you will give to the Second User: </h4>
					</label>
					<input
						id="AmountFromUser1ToUser2"
						onChange={(e) => setAmountFromUser1ToUser2(e.target.value)}
						placeholder="0"
						value={_amountFromUser1ToUser2}
					/>
				</div>
				<div>
					<label for="AmountFromUser2ToUser1">
						<h4>ETH the Second User will give you: </h4>
					</label>
					<input
						id="AmountFromUser2ToUser1"
						onChange={(e) => setAmountFromUser2ToUser1(e.target.value)}
						placeholder="0"
						value={_amountFromUser2ToUser1}
					/>
				</div>

				<button disabled={!write} onClick={() => write?.()}>
					<h4>Create Your Contract</h4>
				</button>
			</form>
		</div>
	)
}
