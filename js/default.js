function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}
	else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		};
	}
}

String.prototype.strReverse = function() {
	var newstring = "";
	for (var s=0; s < this.length; s++) {
		newstring = this.charAt(s) + newstring;
	}
	return newstring;
	//strOrig = ' texttotrim ';
	//strReversed = strOrig.revstring();
};

function chkPass(pwd) {
	var oScorebar = document.getElementById("scorebar");
	var oScore = document.getElementById("score");
	var oComplexity = document.getElementById("complexity");
	var nScore = 0;
	var nLength = 0;
	var nAlphaUC = 0;
	var nAlphaLC = 0;
	var nNumber = 0;
	var nSymbol = 0;
	var nMidChar = 0;
	var nRequirements = 0;
	var nAlphasOnly = 0;
	var nNumbersOnly = 0;
	var nRepChar = 0;
	var nConsecAlphaUC = 0;
	var nConsecAlphaLC = 0;
	var nConsecNumber = 0;
	var nConsecSymbol = 0;
	var nConsecCharType = 0;
	var nSeqAlpha = 0;
	var nSeqNumber = 0;
	var nSeqChar = 0;
	var nReqChar = 0;
	var nReqCharType = 3;
	var nTmpAlphaUC = "";
	var nTmpAlphaLC = "";
	var nTmpNumber = "";
	var nTmpSymbol = "";
	var sAlphaUC = "  0";
	var sAlphaLC = "  0";
	var sNumber = "  0";
	var sSymbol = "  0";
	var sMidChar = "  0";
	var sRequirements = "  0";
	var sAlphasOnly = "  0";
	var sNumbersOnly = "  0";
	var sRepChar = "  0";
	var sConsecAlphaUC = "  0";
	var sConsecAlphaLC = "  0";
	var sConsecNumber = "  0";
	var sSeqAlpha = "  0";
	var sSeqNumber = "  0";
	var sAlphas = "abcdefghijklmnopqrstuvwxyz";
	var sNumerics = "01234567890";
	var sComplexity = "Too Short";
	var sStandards = "Below";
	var nMinPwdLen = 8;
	if (document.all) { var nd = 0; } else { var nd = 1; }
	if (pwd) {
		nScore = parseInt(pwd.length * 4);
		nLength = pwd.length;
		var arrPwd = pwd.replace (/\s+/g,"").split(/\s*/);
		var arrPwdLen = arrPwd.length;
		
		/* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
		for (var a=0; a < arrPwdLen; a++) {
			if (arrPwd[a].match(new RegExp(/[A-Z]/g))) {
				if (nTmpAlphaUC !== "") { if ((nTmpAlphaUC + 1) == a) { nConsecAlphaUC++; nConsecCharType++; } }
				nTmpAlphaUC = a;
				nAlphaUC++;
			}
			else if (arrPwd[a].match(new RegExp(/[a-z]/g))) { 
				if (nTmpAlphaLC !== "") { if ((nTmpAlphaLC + 1) == a) { nConsecAlphaLC++; nConsecCharType++; } }
				nTmpAlphaLC = a;
				nAlphaLC++;
			}
			else if (arrPwd[a].match(new RegExp(/[0-9]/g))) { 
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpNumber !== "") { if ((nTmpNumber + 1) == a) { nConsecNumber++; nConsecCharType++; } }
				nTmpNumber = a;
				nNumber++;
			}
			else if (arrPwd[a].match(new RegExp(/[^a-zA-Z0-9_]/g))) { 
				if (a > 0 && a < (arrPwdLen - 1)) { nMidChar++; }
				if (nTmpSymbol !== "") { if ((nTmpSymbol + 1) == a) { nConsecSymbol++; nConsecCharType++; } }
				nTmpSymbol = a;
				nSymbol++;
			}
			/* Internal loop through password to check for repeated characters */
			for (var b=0; b < arrPwdLen; b++) {
				if (arrPwd[a].toLowerCase() == arrPwd[b].toLowerCase() && a != b) { nRepChar++; }
			}
		}
		
		/* Check for sequential alpha string patterns (forward and reverse) */
		for (var s=0; s < 23; s++) {
			var sFwd = sAlphas.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqAlpha++; nSeqChar++;}
		}
		
		/* Check for sequential numeric string patterns (forward and reverse) */
		for (var s=0; s < 8; s++) {
			var sFwd = sNumerics.substring(s,parseInt(s+3));
			var sRev = sFwd.strReverse();
			if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqNumber++; nSeqChar++;}
		}
		
	/* Modify overall score value based on usage vs requirements */

		/* General point assignment */
		document.getElementById("nLengthBonus").value = "+ " + nScore; 
		if (nAlphaUC > 0 && nAlphaUC < nLength) {	
			nScore = parseInt(nScore + (nAlphaUC * (nLength - nAlphaUC)));
			sAlphaUC = "+ " + parseInt(nAlphaUC * (nLength - nAlphaUC)); 
		}
		if (nAlphaLC > 0 && nAlphaLC < nLength) {	
			nScore = parseInt(nScore + (nAlphaLC * (nLength - nAlphaLC))); 
			sAlphaLC = "+ " + parseInt(nAlphaLC * (nLength - nAlphaLC));
		}
		if (nNumber > 0 && nNumber < nLength) {	
			nScore = parseInt(nScore + (nNumber * 5));
			sNumber = "+ " + parseInt(nNumber * 5);
		}
		if (nSymbol > 0) {	
			nScore = parseInt(nScore + (nSymbol * 8));
			sSymbol = "+ " + parseInt(nSymbol * 8);
		}
		if (nMidChar > 0) {	
			nScore = parseInt(nScore + (nMidChar * 2));
			sMidChar = "+ " + parseInt(nMidChar * 2);
		}
		document.getElementById("nAlphaUCBonus").value = sAlphaUC; 
		document.getElementById("nAlphaLCBonus").value = sAlphaLC;
		document.getElementById("nNumberBonus").value = sNumber;
		document.getElementById("nSymbolBonus").value = sSymbol;
		document.getElementById("nMidCharBonus").value = sMidChar;
		
		/* Point deductions for poor practices */
		if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
			nScore = parseInt(nScore - nLength);
			nAlphasOnly = nLength;
			sAlphasOnly = "- " + nLength;
		}
		if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
			nScore = parseInt(nScore - nLength); 
			nNumbersOnly = nLength;
			sNumbersOnly = "- " + nLength;
		}
		if (nRepChar > 0) {  // Same character exists more than once
			nScore = parseInt(nScore - nRepChar);
			sRepChar = "- " + nRepChar;
		}
		if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
			nScore = parseInt(nScore - (nConsecAlphaUC * 2)); 
			sConsecAlphaUC = "- " + parseInt(nConsecAlphaUC * 2);
		}
		if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
			nScore = parseInt(nScore - (nConsecAlphaLC * 2)); 
			sConsecAlphaLC = "- " + parseInt(nConsecAlphaLC * 2);
		}
		if (nConsecNumber > 0) {  // Consecutive Numbers exist
			nScore = parseInt(nScore - (nConsecNumber * 2));  
			sConsecNumber = "- " + parseInt(nConsecNumber * 2);
		}
		if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqAlpha * 3)); 
			sSeqAlpha = "- " + parseInt(nSeqAlpha * 3);
		}
		if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
			nScore = parseInt(nScore - (nSeqNumber * 3)); 
			sSeqNumber = "- " + parseInt(nSeqNumber * 3);
		}
		document.getElementById("nAlphasOnlyBonus").value = sAlphasOnly; 
		document.getElementById("nNumbersOnlyBonus").value = sNumbersOnly; 
		document.getElementById("nRepCharBonus").value = sRepChar; 
		document.getElementById("nConsecAlphaUCBonus").value = sConsecAlphaUC; 
		document.getElementById("nConsecAlphaLCBonus").value = sConsecAlphaLC; 
		document.getElementById("nConsecNumberBonus").value = sConsecNumber;
		document.getElementById("nSeqAlphaBonus").value = sSeqAlpha; 
		document.getElementById("nSeqNumberBonus").value = sSeqNumber; 

		/* Determine if mandatory requirements have been met and set image indicators accordingly */
		var arrChars = [nLength,nAlphaUC,nAlphaLC,nNumber,nSymbol];
		var arrCharsIds = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol"];
		var arrCharsLen = arrChars.length;
		for (var c=0; c < arrCharsLen; c++) {
			var oImg = document.getElementById('div_' + arrCharsIds[c]);
			document.getElementById(arrCharsIds[c]).value = arrChars[c];
			if (arrCharsIds[c] == "nLength") { var minVal = parseInt(nMinPwdLen - 1); } else { var minVal = 0; }
			if (arrChars[c] == parseInt(minVal + 1)) { nReqChar++; oImg.className = "pass"; }
			else if (arrChars[c] > parseInt(minVal + 1)) { nReqChar++; oImg.className = "exceed"; }
			else { oImg.className = "fail"; }
		}
		nRequirements = nReqChar;
		if (pwd.length >= nMinPwdLen) { var nMinReqChars = 3; } else { var nMinReqChars = 4; }
		if (nRequirements > nMinReqChars) {  // One or more required characters exist
			nScore = parseInt(nScore + (nRequirements * 2)); 
			sRequirements = "+ " + parseInt(nRequirements * 2);
		}
		document.getElementById("nRequirementsBonus").value = sRequirements;

		/* Determine if additional bonuses need to be applied and set image indicators accordingly */
		var arrChars = [nMidChar,nRequirements];
		var arrCharsIds = ["nMidChar","nRequirements"];
		var arrCharsLen = arrChars.length;
		for (var c=0; c < arrCharsLen; c++) {
			var oImg = document.getElementById('div_' + arrCharsIds[c]);
			document.getElementById(arrCharsIds[c]).value = arrChars[c];
			if (arrCharsIds[c] == "nRequirements") { var minVal = nMinReqChars; } else { var minVal = 0; }
			if (arrChars[c] == parseInt(minVal + 1)) { oImg.className = "pass"; }
			else if (arrChars[c] > parseInt(minVal + 1)) { oImg.className = "exceed"; }
			else { oImg.className = "fail"; }
		}

		/* Determine if suggested requirements have been met and set image indicators accordingly */
		var arrChars = [nAlphasOnly,nNumbersOnly,nRepChar,nConsecAlphaUC,nConsecAlphaLC,nConsecNumber,nSeqAlpha,nSeqNumber];
		var arrCharsIds = ["nAlphasOnly","nNumbersOnly","nRepChar","nConsecAlphaUC","nConsecAlphaLC","nConsecNumber","nSeqAlpha","nSeqNumber"];
		var arrCharsLen = arrChars.length;
		for (var c=0; c < arrCharsLen; c++) {
			var oImg = document.getElementById('div_' + arrCharsIds[c]);
			document.getElementById(arrCharsIds[c]).value = arrChars[c];
			if (arrChars[c] > 0) { oImg.className = "warn"; }
			else { oImg.className = "pass"; }
		}
		
		/* Determine complexity based on overall score */
		if (nScore > 100) { nScore = 100; } else if (nScore < 0) { nScore = 0; }
		if (nScore >= 0 && nScore < 20) { sComplexity = "Very Weak"; }
		else if (nScore >= 20 && nScore < 40) { sComplexity = "Weak"; }
		else if (nScore >= 40 && nScore < 60) { sComplexity = "Good"; }
		else if (nScore >= 60 && nScore < 80) { sComplexity = "Strong"; }
		else if (nScore >= 80 && nScore <= 100) { sComplexity = "Very Strong"; }
		
		/* Display updated score criteria to client */
		oScorebar.style.backgroundPosition = "-" + parseInt(nScore * 4) + "px";
		oScore.innerHTML = nScore + "%";
		oComplexity.innerHTML = sComplexity;
	}
	else {
		/* Display default score criteria to client */
		initPwdChk();
		oScore.innerHTML = nScore + "%";
		oComplexity.innerHTML = sComplexity;
	}
}

function togPwdMask() {
	var oPwd = document.getElementById("passwordPwd");
	var oTxt = document.getElementById("passwordTxt");
	var oMask = document.getElementById("mask");
	if (oMask.checked) { 
		oPwd.value = oTxt.value;
		oPwd.className = ""; 
		oTxt.className = "hide"; 
	} 
	else { 
		oTxt.value = oPwd.value;
		oPwd.className = "hide"; 
		oTxt.className = "";
	}
}

function initPwdChk(restart) {
	/* Reset all form values to their default */
	document.getElementById("nLength").value = 0;
	document.getElementById("nAlphaUC").value = 0;
	document.getElementById("nAlphaLC").value = 0;
	document.getElementById("nNumber").value = 0;
	document.getElementById("nSymbol").value = 0;
	document.getElementById("nMidChar").value = 0;
	document.getElementById("nRequirements").value = 0;
	document.getElementById("nAlphasOnly").value = 0;
	document.getElementById("nNumbersOnly").value = 0;
	document.getElementById("nRepChar").value = 0;
	document.getElementById("nConsecAlphaUC").value = 0;
	document.getElementById("nConsecAlphaLC").value = 0;
	document.getElementById("nConsecNumber").value = 0;
	document.getElementById("nSeqAlpha").value = 0;
	document.getElementById("nSeqNumber").value = 0;
	document.getElementById("nLengthBonus").value = "  0";
	document.getElementById("nAlphaUCBonus").value = "  0";
	document.getElementById("nAlphaLCBonus").value = "  0";
	document.getElementById("nNumberBonus").value = "  0";
	document.getElementById("nSymbolBonus").value = "  0";
	document.getElementById("nMidCharBonus").value = "  0";
	document.getElementById("nRequirementsBonus").value = "  0";
	document.getElementById("nAlphasOnlyBonus").value = "  0";
	document.getElementById("nNumbersOnlyBonus").value = "  0";
	document.getElementById("nRepCharBonus").value = "  0";
	document.getElementById("nConsecAlphaUCBonus").value = "  0";
	document.getElementById("nConsecAlphaLCBonus").value = "  0";
	document.getElementById("nConsecNumberBonus").value = "  0";
	document.getElementById("nSeqAlphaBonus").value = "  0";
	document.getElementById("nSeqNumberBonus").value = "  0";
	document.getElementById("div_nLength").className = "fail";
	document.getElementById("div_nAlphaUC").className = "fail";
	document.getElementById("div_nAlphaLC").className = "fail";
	document.getElementById("div_nNumber").className = "fail";
	document.getElementById("div_nSymbol").className = "fail";
	document.getElementById("div_nMidChar").className = "fail";
	document.getElementById("div_nRequirements").className = "fail";
	document.getElementById("div_nAlphasOnly").className = "pass";
	document.getElementById("div_nNumbersOnly").className = "pass";
	document.getElementById("div_nRepChar").className = "pass";
	document.getElementById("div_nConsecAlphaUC").className = "pass";
	document.getElementById("div_nConsecAlphaLC").className = "pass";
	document.getElementById("div_nConsecNumber").className = "pass";
	document.getElementById("div_nSeqAlpha").className = "pass";
	document.getElementById("div_nSeqNumber").className = "pass";
	document.getElementById("passwordPwd").value = "";
	document.getElementById("passwordTxt").value = "";
	document.getElementById("scorebar").style.backgroundPosition = "0";
	if (restart) {
		document.getElementById("passwordPwd").className = "";
		document.getElementById("passwordTxt").className = "hide";
		document.getElementById("mask").checked = true;
	}
}

addLoadEvent(function() { initPwdChk(1); });

