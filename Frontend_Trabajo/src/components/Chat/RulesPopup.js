import "assets/css/user-styles.css";
import SelectImgUser from "hooks/SelectImgUser";

import React, { useState } from "react";
import { 
	Button,
	Card,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Media
} from "reactstrap";

import markAsSeen from "hooks/markAsSeen";
import rules from "hooks/rules";

const RulesPopup = (props) => {
	const [message, setMessage] = useState("");

	let { rulesOpen, setRulesOpen } = props;

	if (rulesOpen)
	return (
		<>
			<Card className="rules-body" color="contrast">
				{rules}
			</Card>
			<Card className={"rules-header chat-text-xxl"} color="primary" onClick = {() => setRulesOpen(!rulesOpen)}>
				?
			</Card>
		</>
	);
	else
	return (
		<Card className={"rules-header chat-text-xxl"} color="primary" onClick = {() => setRulesOpen(!rulesOpen)}>
			?
		</Card>
	);
}

export default RulesPopup;