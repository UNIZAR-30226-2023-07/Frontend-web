import "assets/css/user-styles.css";

import React from "react";
import {  Card } from "reactstrap";

import rules from "hooks/rules";

const RulesPopup = (props) => {

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