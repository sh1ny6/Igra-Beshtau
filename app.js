let gameVisual = 1;
let btnLeft = false;
let btnRight = false;
if (sessionStorage.getItem('gameVisual') == 2) {
	gameVisual = 2
} else {
	gameVisual = 1
}
window.addEventListener('load', () => {
	// ----- CANVAS SETUP HERE
	
	// 16:9 landscape proportion
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	/*
	let gameWidth = 1280, gameHeight = 720; // initial values
	
	gameWidth = vw;
	gameHeight = Math.round(vw * 9 / 16);
	
	const scaleCoef = gameWidth / 1920;
	//const scaleCoef = 1;
	
	if(gameHeight > vh) {
		//loooooong screen
		gameHeight = vh;
		gameWidth = Math.round(vh * 16 / 9);
	}
	*/
	/* if(vh > vw) {
		// page is in portrait mode
		gameWidth = vw;
		gameHeight = Math.round(9 * vw / 16);
	} else {
		let coef = 1.98; // 1920 / 965
		if(vw > Math.round(vh * coef) + 10) {
			// loooong screens
			gameHeight = vh;
			gameWidth = vh * coef;
		} else {
			gameWidth = vw;
			gameHeight = vh;
			// TODO: scale for narrower screens
		}
	} */
	gameWidth = vw;
	gameHeight = vh;
	let scaleCoef = gameWidth / 1920;
	kaboom({
		width: gameWidth,
		height: gameHeight
	});
	initAssets();
	
	let bgx = play('level', {
		loop: true,
		volume: 0.4,
		paused: true
	}); // background music
	
	const JUMP_FORCE = 550;
	const SPEED = 350;
	const GRAVITY = 900;
	
	// score settings
	const SETTINGS = {
		score: {
			coin: 1,
			interactable: 50,
			complete: 100,
			parts: {
				keyboard: 50,
				mouse: 100,
				comp: 250,
				monitor: 500
			}
		}
	};

	// WELCOME SCREEN
	scene("start", () => {		
		// GAME BACKGROUND - using on all screens
		if (gameVisual == 1) {
			add([sprite('background-0', {
				width: gameWidth,
				height: gameHeight
			}),pos(0,0), stay(), fixed(), z(-3)]);
			add([sprite('background-1', {
				width: gameWidth,
				height: gameHeight
			}),pos(0,0), stay(), fixed(), z(-2)]);	
		} else if (gameVisual == 2) {
			add([sprite('background-0', {
				width: gameWidth,
				height: gameHeight
			}),pos(0,0), stay(), fixed(), z(-3)]);
		}
		
		// clouds - on all screens?
		let clouds = [];
		let maxClouds = 3;
		for(let i = 0; i < maxClouds; i++) {
			clouds.push(add([
				'cloud',
				sprite('cloud', {width: 300 * (randi(50, 150) / 100), flipX: rand(10) > 5 ? true : false}),
				anchor('center'),
				z(-1),
				fixed(),
				stay(),
				opacity(randi(5,10) / 10),
				pos(gameWidth * (1 + randi(7,50) / 100), gameHeight * 0.1 + i * randi(30,50)),
				{
					speed: randi(2,8) * 10,
					isActive: true
				}
			]));
		}
		
		onUpdate('cloud', obj => {
			obj.move(-obj.speed, 0);
			if(obj.pos.x < -1 * (obj.width / 2 + 5)) {
				obj.pos.x = gameWidth * (1 + randi(7,50) / 100);
				obj.width = 300 * (randi(50, 150) / 100);
				obj.speed = randi(2,8) * 10,
				obj.flipX = rand(10) > 5 ? true : false;
				obj.use(opacity(randi(5,10) / 10));
			}
		});
		
		// WELCOME SCREEN LOGO
		let logoWidth = 306; // actual sprite size
		let logoHeight = 260;
		add([sprite('screenWelcomeLogo', {
			width: logoWidth,
			height: logoHeight
		}), pos(gameWidth / 2 - (logoWidth * scaleCoef) / 2, 246 * scaleCoef), scale(scaleCoef)]);
		
		// WELCOME SCREEN CAPTION
		let captionWidth = 930;
		let captionHeight = 121;
		add([sprite('screenWelcomeCaption', {
			width: captionWidth,
			height: captionHeight
		}), pos(gameWidth / 2 - (captionWidth * scaleCoef) / 2, 530 * scaleCoef), scale(scaleCoef)]);
		
		// WELCOME SCREEN BUTTON
		let btnWidth = 512;
		let btnHeight = 140;
		add(["startButton", sprite('screenWelcomeBtn', {
			width: btnWidth,
			height: btnHeight
		}), pos(gameWidth / 2 - (btnWidth * scaleCoef) / 2, 700 * scaleCoef), scale(scaleCoef), area()]);
		
		// HOVER HANDLING
		/* onHover("startButton", (btn) => {
			btn.use(color(200,50,255));
		});
		onHoverEnd("startButton", (btn) => {
			btn.use(color(150,0,255));
		}); */
		onClick("startButton", () => {
			go("tutorial");
		});

		let btnChangeWidth = 600;
		let btnChangeHeight = 120;
		add(["btnChange", sprite('designChangeBtn', {
			width: btnChangeWidth,
			height: btnChangeHeight
		}), pos(gameWidth - btnChangeWidth * scaleCoef / 2 - 20, gameHeight / 7 - (btnChangeHeight * scaleCoef / 2)), scale(scaleCoef), anchor('center'),z(1500),fixed(),area()]);
		//HOVER HANDLING
		/* onHover("btnStart", (btn) => {
			btn.use(color(200,50,255));
		});
		onHoverEnd("btnStart", (btn) => {
			btn.use(color(150,0,255));
		}); */
		onClick("btnChange", () => {
			if (gameVisual == 2) {
				sessionStorage.setItem('gameVisual', 1)
			} else {
				sessionStorage.setItem('gameVisual', 2)
			}
			window.location.reload()
		});
	});
	
	scene("tutorial", () => {
		volume(1);
		bgx.seek(0);
		bgx.paused = false;
		
		onUpdate('cloud', obj => {
			obj.move(-obj.speed, 0);
			if(obj.pos.x < -1 * (obj.width / 2 + 5)) {
				obj.pos.x = gameWidth * (1 + randi(7,50) / 100);
				obj.width = 300 * (randi(50, 150) / 100);
				obj.speed = randi(2,8) * 10,
				obj.flipX = rand(10) > 5 ? true : false;
				obj.use(opacity(randi(5,10) / 10));
			}
		});
		
		
		add([rect(gameWidth, gameHeight), color(Color.BLACK), opacity(0.3), pos(0,0)]);
		add([sprite('screenTutorialContent', {height: gameHeight}), fixed(), anchor('top'), pos(gameWidth / 2, 0)]);
		
		add(["startButton", sprite('screenTutorialBtnContinue', {height: 90 * scaleCoef}), pos(gameWidth / 2, gameHeight * 0.9), anchor('center'), area()]);
		onClick("startButton", () => {
			go("select");
		});
	});
	
	// CHARACTER SELECT SCREEN
	scene("select", () => {		
		onUpdate('cloud', obj => {
			obj.move(-obj.speed, 0);
			if(obj.pos.x < -1 * (obj.width / 2 + 5)) {
				obj.pos.x = gameWidth * (1 + randi(7,50) / 100);
				obj.width = 300 * (randi(50, 150) / 100);
				obj.speed = randi(2,8) * 10,
				obj.flipX = rand(10) > 5 ? true : false;
				obj.use(opacity(randi(5,10) / 10));
			}
		});
		
		//SELECT SCREEN LOGO
		let logoWidth = 172; // actual sprite size
		let logoHeight = 144;
		add([sprite('screenSelectLogo', {
			width: logoWidth,
			height: logoHeight
		}), pos(108 * scaleCoef, 63 * scaleCoef), scale(scaleCoef)]);
		
		//SELECT CHARACTER NAME
		let boxWidth = gameWidth / 3;
		let boxHeight = boxWidth / 5;
		let outlineWidth = 10;
		let outlineRadius = 20;
		let posX = gameWidth / 2 - boxWidth / 2;
		let posY = gameHeight * 0.05;
		onDraw(() => { // box
			drawMasked(() => {
				drawRect({
					width: boxWidth,
					height: boxHeight,
					pos: vec2(posX, posY),
					gradient: [Color.fromHex('#0BDB83'), Color.fromHex('#83E9CA')]
				});
			}, () => {
				drawRect({
					width: boxWidth,
					height: boxHeight,
					pos: vec2(posX, posY),
					radius: outlineRadius
				});
			});
			
			drawMasked(() => {
				drawRect({
					width: boxWidth - outlineWidth * 2,
					height: boxHeight - outlineWidth * 2,
					pos: vec2(posX + outlineWidth, posY + outlineWidth),
					color: color.WHITE
				});
			}, () => {
				drawRect({
					width: boxWidth - outlineWidth * 2,
					height: boxHeight - outlineWidth * 2,
					pos: vec2(posX + outlineWidth, posY + outlineWidth),
					radius: outlineRadius - (outlineWidth / 2)
				});
			});
		});
		
		let textWidth = boxWidth - outlineWidth * 2;;
		let textSize = 44;
		let charName = add([text("Выбери героя", {
			font: 'Onest Bold',
			size: Math.round(textSize * scaleCoef),
			width: textWidth,
			align: 'center',
		}),pos(gameWidth / 2 - textWidth / 2, posY + (boxHeight / 2) - (textSize / 2) + outlineWidth / 2 ),fixed(),z(1500), color(Color.fromHex('#009657'))]);
		
		//SELECT SCREEN CHARACTER DESCRIPTION
		let charTextWidth = gameWidth * 0.6;
		let charTextSize = 32;
		let charText = add([text("Выбери героя", {
			font: 'Onest Bold',
			size: Math.round(charTextSize * scaleCoef),
			width: charTextWidth,
			align: 'center',
			lineSpacing: charTextSize / 3
		}),pos(gameWidth / 2 - charTextWidth / 2, gameHeight * 0.7),fixed(),z(1500), color(Color.WHITE)]);

		//SELECT SCREEN CHARACTERS
		let currentCharacter = 0;
		let characters = [];
		
		// select here
		characters.push({
			scale: 1,
			sprites: {
				idle: sprite('char1_idle'),
				run: sprite('char1_walk'),
				jump: sprite('char1_jump'),
				big: sprite('char1_big'),
			},
			animations: { run: 'char1-walk-anim' },
			name: 'Инженер-конструктор',
			description: 'Суров, бородат и могуч. Способен с легкостью собрать любой монитор и компьютер, а еще покорить любую вершину.'
		});
		
		characters.push({
			scale: 1,
			sprites: {
				idle: sprite('char2_idle'),
				run: sprite('char2_walk'),
				jump: sprite('char2_jump'),
				big: sprite('char2_big'),
			},
			animations: { run: 'char2-walk-anim' },
			name: 'Инженер-разработчик',
			description: 'Аналитический склад ума и изобретательский опыт. Может разработать и реализовывать план покорения любых вершин.'
		});
		
		characters.push({
			scale: 1,
			sprites: {
				idle: sprite('char3_idle'),
				run: sprite('char3_walk'),
				jump: sprite('char3_jump'),
				big: sprite('char3_big'),
			},
			animations: { run: 'char3-walk-anim' },
			name: 'Инженер-красотка',
			description: 'Красива, умна и изобретательна. Легко очаровывает любые горы и покоряет вершины.'
		});

		let selector = add([
			characters[0].sprites.big,
			scale(0.4 * scaleCoef),
			anchor('center'),
			pos(gameWidth / 2, gameHeight * 0.45),
			{
				speed: 500,
				previousHeight: null,
				heightDelta: 0,
				direction: 'right'
			},
			z(1500)
		]);
		
		charName.text = characters[0].name;
		charText.text = characters[0].description;

		//SELECT SCREEN PREV BUTTON
		let btnPrevWidth = 140;
		let btnPrevHeight = 148;
		add(["btnPrev", sprite('screenSelectBtnPrevNext', {
			width: btnPrevWidth,
			height: btnPrevHeight
		}), pos(gameWidth / 4, gameHeight / 2),scale(scaleCoef),anchor('center'),fixed(),z(1500),area()]);
		//HOVER HANDLING
		/* onHover("btnPrev", (btn) => {
			btn.use(color(200,50,255));
		});
		onHoverEnd("btnPrev", (btn) => {
			btn.use(color(150,0,255));
		}); */
		onClick("btnPrev", () => {
			currentCharacter--;
			if(currentCharacter < 0) currentCharacter = characters.length - 1;
			selector.use(characters[currentCharacter].sprites.big);
			charName.text = characters[currentCharacter].name;
			charText.text = characters[currentCharacter].description;
		});
		
		//SELECT SCREEN NEXT BUTTON
		add(["btnNext", sprite('screenSelectBtnPrevNext', {
			width: btnPrevWidth,
			height: btnPrevHeight
		}), pos(gameWidth / 4 * 3, gameHeight / 2),scale(scaleCoef),anchor('center'),fixed(),z(1500),area()]).flipX = true;
		//HOVER HANDLING
		/* onHover("btnNext", (btn) => {
			btn.use(color(200,50,255));
		});
		onHoverEnd("btnNext", (btn) => {
			btn.use(color(150,0,255));
		}); */
		onClick("btnNext", () => {
			currentCharacter++;
			if(currentCharacter >= characters.length) currentCharacter = 0;
			selector.use(characters[currentCharacter].sprites.big);
			charName.text = characters[currentCharacter].name;
			charText.text = characters[currentCharacter].description;
		});
		
		
		//SELECT SCREEN START BUTTON
		let btnSelectWidth = 440;
		let btnSelectHeight = 120;
		add(["btnStart", sprite('screenSelectBtnStart', {
			width: btnSelectWidth,
			height: btnSelectHeight
		}), pos(gameWidth / 2, gameHeight * 0.95 - (btnSelectHeight * scaleCoef / 2) ), scale(scaleCoef), anchor('center'),z(1500),fixed(),area()]);
		//HOVER HANDLING
		/* onHover("btnStart", (btn) => {
			btn.use(color(200,50,255));
		});
		onHoverEnd("btnStart", (btn) => {
			btn.use(color(150,0,255));
		}); */
		onClick("btnStart", () => {
			go("game", characters[currentCharacter]);
		});
		
});
	// GAME SCREEN
	scene("game", (selectedCharacter) => {		
		onUpdate('cloud', obj => {
			obj.move(-obj.speed, 0);
			if(obj.pos.x < -1 * (obj.width / 2 + 5)) {
				obj.pos.x = gameWidth * (1 + randi(7,50) / 100);
				obj.width = 300 * (randi(50, 150) / 100);
				obj.speed = randi(2,8) * 10,
				obj.flipX = rand(10) > 5 ? true : false;
				obj.use(opacity(randi(5,10) / 10));
			}
		});
		
		setGravity(GRAVITY);
		
		// ----- LEVEL INIT -----
		let tileSize = 32;
		let tileScale = 0.145;
		const map = addLevel([
			'                                                                                                                                        0',
			'                                                                                                                       ? FP C           0',
			'                                                                                                                      *2333334*         0',
			'                                                                                                                      =    *  =  *      0',
			'                                                                                                                   R 2    ?=   4 = *    0',
			'                                                                                          *                     P  = 5  E =    5   =    0',
			'                                                                  * *  Y P*        F Z R E*      * C D Y *      =    5  =  =   5     D W0',
			'                                                                  * 2333334     ?2333333334      *23333334?      *2 *5= *  *  =5   *23340',
			'                                                                 *2411111114  * =5   P    5    *B25  P * 54*   *245 =5  =  =      C211110',
			'                                                             *   211      11  = *5   = =  5   *241 *2334  54   2115  5=         *2411111 ',
			'                                                    *     *  =         A        =14  * * =  * 255  25555D  * B21111= * *24BB C 241111111 ',
			'                                                    = *   = ?      R   =   *   = 5   = =  X =    Z * * *  233411111233341123334111111111 ',
			'                                                 D    =  4  =      = *   * =     54=  * *23333333333333334111111111111111111111111111111 ',
			'                                   P  ?        C24* =BRB 5  C 24     =   =   C2* 55  233411111111111111111111111111111111111111111111111 ',
			'                                   =  =   E B*24114  234*D*2345  F = B E B  2414*   21111111111111111111111111111111111111111111111      ',
			'                           *          *  23334111114 55523455   233333333334111123341111111111111111111111111111111111111111111          ',
			'                        E  *C         = A51111111115 * * * *  231111111111111111111111111111111111111111                                 ',
			'0                      233334 ?     2 R =111111111112333333334111111111111111111111111111111111111111                                    ',
			'0                    *25      =  *B25 = *5111111111111111111111111111111111111111111111111111111                                         ',
			'0             *      25 A       23415 Z =1111111111111111111111111111111111111111111111                                                  ',
			'0        R    = *   25  =    F 211111233411111111111111111111111111111                                                                   ',
			'0    *   =      =  D     *  23411111111111111111111111111                                                                                ',
			'0 *  =            2334   =  51111111111111111111111111                                                                                   ',
			'0 = *   *  *  *B*21115BB   21111111111111111111111                                                                                       ',
			'0   = C =  =  23411111233341111111111111111111                                                                                           ',
			'0233334  =   2111111111111111111111111111                                                                                                ',
			'0111115*  Z 2111111111111111111111111                                                                                                    ',
			' 111111233341111111111111111111111111                                                                                                    ',
			' 11111111111111111111111                                                                                                                 ',
			' 11111111111111111111                                                                                                                    ',
			' 11111111111111111111                                                                                                                    ',
			' 11111111111111111111                                                                                                                    '
		],{
			tileWidth: tileSize,
			tileHeight: tileSize,
			tiles: {
				/*--- GROUND ---*/
				0: () => [rect(tileSize / tileScale,tileSize / tileScale), opacity(0), area(), scale(tileScale), body({isStatic: true})],
				1: () => ['tile-ground', 'deep', 'hollow', sprite('ground-deep-1'), scale(tileScale)],
				2: () => ['tile-ground', sprite('ground-top-left'), area(), scale(tileScale), body({isStatic: true})],
				3: () => ['tile-ground', sprite('ground-top-center'), area({shape: new Rect(vec2(0), Math.round(tileSize / tileScale), Math.round(tileSize / tileScale))}), scale(tileScale), body({isStatic: true})],
				4: () => ['tile-ground', sprite('ground-top-right'), area(), scale(tileScale), body({isStatic: true})],
				5: () => ['tile-ground', sprite('ground-deep-2'), area(), scale(tileScale), body({isStatic: true})],
				/*--- BONUSES ---*/
				A: () => ['bonus-shield', sprite('bonus-shield', {width: 22, height: 22}), area(), pos(tileSize / 5,tileSize / 4 - 1)],
				P: () => ['bonus-health', sprite('bonus-maxHealth', {width: 22, height: 22}), area(), pos(tileSize / 5,tileSize / 4 - 1)],
				R: () => ['bonus-double', sprite('bonus-double', {width: 22, height: 22}), area(), pos(tileSize / 5,tileSize / 4 - 1)],
				/*--- DANGER ---*/
				B: () => ['danger-top', sprite('spikes_bottom', {width: tileSize}), area({shape: new Rect(vec2(0), tileSize, Math.round(tileSize * 0.3))}), anchor("botleft"), pos(vec2(0,tileSize)), body({isStatic: true})],
				C: () => ['danger', sprite('wires', {width: tileSize, flipX: randi()}), area({shape: new Rect(vec2(0), tileSize * 0.5, 20 * scaleCoef), offset: vec2(0, -1)}), anchor("center"), pos(vec2( (tileSize / 2),tileSize + 2)), z(1500)],
				D: () => ['danger-move', sprite('spikes_top', {width: tileSize}), anchor('top'), pos(vec2(tileSize / 2, -1 * tileSize)), area(), body({isStatic: true}), {speed: -20, reverse: false, moveTimer: new Timer(3)}],
				E: () => ['danger-arc', anchor('center'), pos(vec2(tileSize / 2, 0)), {chargeTimer: new Timer(4, () => {return false}), sfx: play('electric', {volume: 0.4, paused: true})}],
				F: () => ['danger-transformer', sprite('transformer', {width: 22}), anchor('center'), pos(vec2(tileSize / 2, tileSize * 0.5)), { chargeTimer: new Timer(4, () => {return false}), sfx: play('transformer', {volume: 0.4, paused: true}) }],
				/*--- COLLECTABLES ---*/
				'*': () => ['collectable-score', sprite('score'), scale(0.12), area(), anchor('center'), pos(tileSize / 2 + 2,tileSize * 0.7)],
				'?': () => ['collectable-life', sprite('heart-outline'), scale(0.15), area(), anchor('center'), pos(tileSize / 2 + 2,tileSize * 0.7)],
				/*--- INTERACTABLE ---*/
				X: () => [
					'interactable', 
					sprite('workstation-1-broken', {width: 60}), 
					area(), 
					anchor("botleft"), 
					pos(0, tileSize + 3), 
					{
						isInteractable : false, 
						isRepaired: false,
						isActive: false,
						repairTimer: new Timer(5),
						spriteRepaired: 'workstation-1'
					}, 
					z(1400),
					
				],
				Y: () => [
					'interactable', 
					sprite('workstation-2-broken', {width: 60}), 
					area(), 
					anchor("botleft"), 
					pos(0, tileSize + 7), 
					{
						isInteractable : false, 
						isRepaired: false,
						isActive: false,
						repairTimer: new Timer(5),
						spriteRepaired: 'workstation-2'
					}, 
					z(1400),
					
				],
				Z: () => [
					'interactable', 
					sprite('workstation-3-broken', {width: 60}), 
					area(), 
					anchor("botleft"), 
					pos(0, tileSize + 7), 
					{
						isInteractable : false, 
						isRepaired: false,
						isActive: false,
						repairTimer: new Timer(5),
						spriteRepaired: 'workstation-3'
					}, 
					z(1400),
					
				],
				/*--- PLATFORMS ---*/
				'=': () => ['platform-empty', 'tile-ground', sprite('platform'), area(), scale(tileScale), z(1200), body({isStatic: true})],
				/*--- WIN FLAG ---*/
				W: () => ['win', sprite('win-flag', {height: 50 * scaleCoef}), area({shape: new Rect(vec2(0), Math.round(30 * scaleCoef), Math.round(50 * scaleCoef)), offset: vec2(2, -2)}), anchor('botleft'), pos(vec2(0, tileSize + 2)), z(1300)],
			}
		});
		
		const mapScale = 3;
		map.use(scale(mapScale));
		map.children.forEach(tile => {
			if(tile.is('interactable')) {
				tile.add(['sign', sprite('repair-sign', {width: 35}), anchor('top'), z(2000), pos(30, 5)]);
				tile.add(['text', sprite('repair-sign-2', {height: 10}), anchor('top'), z(2000), pos(30, -50)]);
				tile.add(['repair-cloud', sprite('repair-cloud', {width: 120}), z(2000), pos(-27, -75)]).hidden = true;
				tile.add([
					'progress-bar',
					z(2500),
					pos(13 * scaleCoef, -30 * scaleCoef),
					{
						boxWidth: 40,
						boxHeight: 6,
						boxRadius: 1.5
					}
				]).hidden = true;
				tile.get('progress-bar').forEach(e => {
					//outer bar outline
					e.add([ rect(e.boxWidth, e.boxHeight, {radius: e.boxRadius, fill: false}), pos(0,0), outline(0.8, Color.fromHex("#5D5D5D")) ]);
					//inner bar outline
					e.add([ rect(e.boxWidth - 2, e.boxHeight - 2, {radius: e.boxRadius * 0.5, fill: false}), pos(1,1), outline(0.6, Color.fromHex("#5D5D5D")), color(Color.fromHex("#5D5D5D")) ]);
					//inner bar color - ADJUSTABLE WIDTH HERE
					e.add([ 'bar', rect(0, e.boxHeight - 2, {radius: e.boxRadius * 0.5, fill: false}), pos(1,1), color(Color.fromHex("#ff7d04")) ]);
					//text
					e.add([sprite('repair-text', {width: e.boxWidth - 4}), pos(2, -1 * (e.boxHeight + 1))]);
				});
			} else if(tile.is('danger')) {
				tile.add(['effect', sprite('effect-scull', {width: 7}), anchor('center'), pos(vec2(0, -35))]);
			} else if(tile.is('danger-top')) {
				tile.add(['effect', sprite('effect-scull', {width: 7}), anchor('center'), pos(vec2(16, -20))]);
			} else if(tile.is('deep')) {
				tile.paused = true;
				tile.solid = false;
			} else if(tile.is('danger-arc')) {
				tile.chargeTimer.action = () => {tile.get('arc-effect')[0].hidden = false; wait(1, () => {tile.get('arc-effect')[0].hidden = true; tile.chargeTimer.reset(4);});}
				tile.add([
					sprite('arc-ball', {width: 20}),
					anchor('center'),
					pos(vec2(0, -35))
				]);
				tile.add([
					sprite('arc-ball', {width: 20}),
					anchor('center'),
					pos(vec2(0, 35))
				]);
				tile.add([
					'arc-effect',
					sprite('arc-effect', {height: 65}),
					anchor('center'),
					pos(vec2(0,0)),
					area()
				]).hidden = true;
				tile.add(['effect', sprite('effect-scull', {width: 7}), anchor('center'), pos(vec2(0, -50))]);
			} /* else if(tile.is('platform-move')) {
				tile.moveTimer.action = () => {wait(1, () => {tile.reverse = !tile.reverse; tile.moveTimer.reset(3);})}
			} */ 
			else if(tile.is('danger-move')) {
				tile.moveTimer.action = () => {wait(0.5, () => {tile.reverse = !tile.reverse; tile.moveTimer.reset(2);})}
				tile.add(['effect', sprite('effect-scull', {width: 7}), anchor('center'), pos(vec2(0, 20))]);
			} else if(tile.is('danger-transformer')) {
				tile.add([
					'transformer-explode',
					sprite('transformer-explode', {width: 60}),
					anchor('center'),
					pos(vec2(0,0)),
					area(),
					z(2900)
				]).hidden = true;
				tile.chargeTimer.action = () => {let explode = tile.get('transformer-explode')[0]; explode.hidden = false; explode.play('explode-anim', {speed: 8}); wait(0.5, () => {tile.get('transformer-explode')[0].hidden = true; tile.chargeTimer.reset(4);});}
				tile.add(['effect', sprite('effect-scull', {width: 7}), anchor('center'), pos(vec2(0, -30))]);
			} else if(tile.is('win')) {
				tile.add(['text', text('Чтобы покорить вершину, собери все части Российского ПК', {font: 'Inter', size: 6, width: 120, align: 'center'}), /*color(Color.fromHex('#ff7d04'))*/ color(Color.WHITE), anchor('bot'), pos(30 * scaleCoef, -45), z(2900)]).hidden = true;
			}
		});

		// ----- PLAYER SETUP -----
		let initialHealth = 3;
		let afterHitDelay = 3;
		const playerSpawnPos = pos(200,2300);
		const player = add([
			selectedCharacter.sprites.idle,
			scale(0.5),
			area({shape: new Rect(vec2(0), 110, 185), offset: vec2(0,-4)}), // hitbox
			anchor('center'),
			body(),
			z(2500),
			playerSpawnPos,
			{
				speed: SPEED,
				previousHeight: null,
				heightDelta: 0,
				direction: 'right',
				isIdle: true,
				score: 0,
				maxHealth: initialHealth,
				isAfterHit: false,
				afterHitDelay: 3,
				blinkFrequency: 1,
				doubleTimer: new Timer(0, () => {return false;}),
				shieldTimer: new Timer(0, () => {return false;}),
				isDouble: () => {return player.doubleTimer.time > 0},
				isShielded: () => {return player.shieldTimer.time > 0},
				isBlocked: false,
				collectedParts: {
					comp: false,
					mouse: false,
					monitor: false,
					keyboard: false,
					isComplete: () => {return player.collectedParts.comp && player.collectedParts.mouse && player.collectedParts.keyboard && player.collectedParts.monitor}
				},
				canMove: {
					left: true,
					right: true,
					up: true,
					down: false
				}
			},
			health(initialHealth)
		]);

		// INTERFACE
		
		add([
			'btnTutorialOpen',
			sprite('screenTutorialBtnOpen', {width: 90 * scaleCoef}),
			anchor('center'),
			area(),
			fixed(),
			pos(gameWidth * 0.05, gameHeight * 0.08),
			z(2000)
		]);
		const tutorialScreen = add([rect(gameWidth, gameHeight), color(Color.BLACK), opacity(0.8), pos(gameWidth / 2,0), anchor("top"), fixed(), z(2900)]);
		tutorialScreen.hidden = true;
		tutorialScreen.add([
			'btnClose',
			sprite('screenTutorialBtnClose', {width: 90 * scaleCoef}),
			anchor('center'),
			area(),
			fixed(),
			pos((gameWidth / 2) * 0.85, gameHeight * 0.1),
			z(3000)
		]);
		tutorialScreen.add([
			sprite('screenTutorialContent', {height: gameHeight}),
			anchor('top'),
			area(),
			fixed(),
			pos(vec2(0)),
			z(2950)
		]);
		onClick("btnTutorialOpen", () => {
			if(tutorialScreen.hidden) {
				player.isBlocked = true;
				player.doubleTimer.paused = true;
				player.shieldTimer.paused = true;
				tutorialScreen.hidden = false;
			}
		});
		onClick("btnClose", () => {
			if(!tutorialScreen.hidden) {
				player.isBlocked = false;
				player.doubleTimer.paused = false;
				player.shieldTimer.paused = false;
				tutorialScreen.hidden = true;
			}
		});
		function isMobile() {
			return navigator.maxTouchPoints > 0 && /Android|Iphone/i.test(navigator.userAgent);
		}
		if (isMobile() == true) {
			add([
				'btnUp',
				sprite('btnUp', {width: 90}),
				anchor('center'),
				area(),
				fixed(),
				pos(gameWidth * 0.94, gameHeight * 0.85),
				z(2000)
			]);
			add([
				'btnLeft',
				sprite('btnLeft', {width: 90}),
				anchor('center'),
				area(),
				fixed(),
				pos(gameWidth * 0.06, gameHeight * 0.85),
				z(2000)
			]);
			add([
				'btnRight',
				sprite('btnRight', {width: 90}),
				anchor('center'),
				area(),
				fixed(),
				pos(gameWidth * 0.06 + 100, gameHeight * 0.85),
				z(2000)
			]);
			add([
				'btnEnter',
				sprite('btnEnter', {width: 90}),
				anchor('center'),
				area(),
				fixed(),
				pos(gameWidth * 0.94, gameHeight * 0.85 - 100),
				z(2000)
			]);
			onClick("btnUp", () => {
				if(!player.isBlocked) {
					if(player.isGrounded()) {
						player.jump(JUMP_FORCE);
						player.use(selectedCharacter.sprites.jump);
						player.isIdle = false;
					}
				}
				btnRight = false;
				btnLeft = false;
			});
			onClick("btnLeft", () => {
				btnLeft = true;
				btnRight = false;
			});
			onMouseDown("left", () => {
				if (btnLeft == true) {
					if(!player.isBlocked) {
						if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded()) {
							player.use(selectedCharacter.sprites.run);
							player.play(selectedCharacter.animations.run);
						}
						
						if(player.direction !== 'left') player.direction = 'left';
						if(player.canMove.left) {
							player.move(-player.speed, 0);
							updateTiles(map, player);
						}
						player.isIdle = false;
					}
					btnLeft = true;
				}
			});
			onMouseRelease("left", () => {
				if(!player.isBlocked) {
					player.use(selectedCharacter.sprites.idle);
					player.isIdle = true;
				}
				btnLeft = false;
			});
			onClick("btnRight", () => {
				btnRight = true;
				btnLeft = false;
			});
			onMouseDown("left", () => {
				if (btnRight == true) {
					if(!player.isBlocked) {
						if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded()) {
							player.use(selectedCharacter.sprites.run);
							player.play(selectedCharacter.animations.run);
						}
						
						if(player.direction !== 'right') player.direction = 'right';
						if(player.canMove.right) {
							player.move(player.speed, 0);
							updateTiles(map, player);
						}
						player.isIdle = false;
					}
					btnRight = true;
				}
			});
			onMouseRelease("left", () => {
				if(!player.isBlocked) {
					player.use(selectedCharacter.sprites.idle);
					player.isIdle = true;
				}
				btnRight = false;
			});
			onClick("btnEnter", () => {
				let interactable = get('interactable',{ recursive: true });
				interactable.forEach(obj => {
					if(player.isColliding(obj)) {
						if(obj.isInteractable && !obj.isRepaired && !player.isBlocked) {
							let repairSfx = play('repair', {loop: true});
							player.isBlocked = true; //block player for the duration of repair
							obj.get('repair-cloud').forEach(e => {e.hidden = false; e.play('repair-anim');console.log(1)});
							obj.get('progress-bar').forEach(e => {e.hidden = false});
							obj.get('text').forEach(e => {e.destroy()});
							obj.repairTimer.action = () => {
								obj.use(sprite(obj.spriteRepaired, {width: 60}));
								obj.use(pos(obj.parent.tileWidth() * obj.tilePos.x, obj.parent.tileHeight() * (obj.tilePos.y + 1) + 2));
								obj.use(z(-1));
								obj.isInteractable = false;
								obj.isRepaired = true;
								obj.isActive = false;
								obj.get('sign').forEach(e => {e.destroy()});
								obj.get('repair-cloud').forEach(e => {e.destroy()});
								obj.get('progress-bar').forEach(e => {e.destroy()});
								player.isBlocked = false;
								let score = player.isDouble() ? SETTINGS.score.interactable * 2 : SETTINGS.score.interactable;
								player.score += score;
								checkScore(player);
								repairSfx.paused = true;
								
								let effect = null;
								for(let i = 0; i < maxEffects; i++) {
									if(collectableEffects[i].free) effect = collectableEffects[i];
								}
								if(!effect) return;
								effect.free = false;
								effect.hidden = false;
								effect.use(pos(player.screenPos().x, player.screenPos().y));
								effect.use(sprite('score', {width: 50}));
								effect.get('effect-value')[0].text = '+' + score;
								wait(effect.ttl, () => {
									effect.free = true;
									effect.hidden = true;
								});
								
								//destroy(repairSfx);
								return false;
							}
							obj.isActive = true;
						}
					}
				});
			});
		}
		onDraw(() => {
			let interfaceTextPosY = gameHeight * 0.05;
			let interfaceTextSize = 70 * scaleCoef;
			
			//player health
			let heartWidth = 60;
			let heartGap = 5;
			for(let i = 1; i <= player.maxHealth; i++) {
				if(i <= player.hp()) {
					drawSprite({
						sprite: "heart",
						width: heartWidth * scaleCoef,
						fixed: true,
						pos: vec2(gameWidth * 0.05 + (heartWidth + heartGap) * scaleCoef * i, interfaceTextPosY)
					});
				} else {
					drawSprite({
						sprite: "heart-empty",
						width: heartWidth * scaleCoef,
						fixed: true,
						pos: vec2(gameWidth * 0.05 + (heartWidth + heartGap) * scaleCoef * i, interfaceTextPosY)
					});
				}
			}
			
			//score box
			let scoreTextFormat = formatText({
				text: '999',
				font: 'Inter',
				size: interfaceTextSize
			});
			let scoreBox = {
				width: Math.max(scoreTextFormat.width * 1.3 * scaleCoef, gameWidth * 0.11),
				height: interfaceTextSize * 1.1,
				posX: gameWidth * 0.88,
				posY: interfaceTextPosY
			};
			drawMasked(() => {
				drawRect({
					width: scoreBox.width,
					height: scoreBox.height,
					fixed: true,
					pos: vec2(scoreBox.posX, scoreBox.posY),
					gradient: [Color.fromHex('#FFFFFF'), Color.fromHex('#B5F1FA')],
					horizontal: true,
					opacity: 0.4
				});
			}, () => {
				drawRect({
					width: scoreBox.width,
					height: scoreBox.height,
					fixed: true,
					pos: vec2(scoreBox.posX, scoreBox.posY),
					radius: 10
				});
			});
			// shadow
			drawText({
				text: player.score,
				size: interfaceTextSize,
				font: 'Inter',
				align: 'right',
				width: scoreBox.width - interfaceTextSize * 0.1,
				pos: vec2(scoreBox.posX + 1, scoreBox.posY + interfaceTextSize * 0.1 + 1),
				color: Color.fromHex('#343434'),
				fixed: true
			});
			// actual text
			drawText({
				text: player.score,
				size: interfaceTextSize,
				font: 'Inter',
				align: 'right',
				width: scoreBox.width - interfaceTextSize * 0.1,
				pos: vec2(scoreBox.posX, scoreBox.posY + interfaceTextSize * 0.1),
				color: rgb(255, 255, 255),
				fixed: true
			});
			drawSprite({
				sprite: "score",
				height: interfaceTextSize * 1.2,
				fixed: true,
				pos: vec2(gameWidth * 0.83, interfaceTextPosY - interfaceTextSize * 0.05)
			});
			
			// bonuses
			let activeBonuses = [];
			let bonusBox = [];
			if(player.isDouble()) {
				activeBonuses.push({
					sprite: "bonus-double",
					value: player.doubleTimer.time
				});
			}
			if(player.isShielded()) {
				activeBonuses.push({
					sprite: "bonus-shield",
					value: player.shieldTimer.time
				});
			}
			
			// measurements loop
			let bonusBoundingWidth = 0; // central part bonuses bounding box width to calculate center negative offset
			let bonusBoxGap = gameWidth * 0.03;
			for(let i = 0; i < activeBonuses.length; i++) {
				let bonusTextFormat = formatText({
					text: activeBonuses[i].value,
					font: 'Inter',
					size: 70 * scaleCoef
				});
				bonusBox.push({
					width: Math.max(bonusTextFormat.width * 2, gameWidth * 0.11),
					height: interfaceTextSize * 1.1,
					posX: gameWidth * 0.5, //initial
					posY: interfaceTextPosY
				});
				bonusBoundingWidth += bonusBox[i].width + bonusBox[i].height * 0.15 + (i ? bonusBoxGap : 0); // 0.15 for sprite being 1.3 the h and w of box
			}

			// actual draw loop
			for(let i = 0; i < activeBonuses.length; i++) {
				bonusBox[i].posX = gameWidth * 0.5 - bonusBoundingWidth * 0.5 + bonusBox[i].height * 0.15 + i * (bonusBox[i].width + bonusBoxGap); // calculated
				drawMasked(() => {
					drawRect({
						width: bonusBox[i].width,
						height: bonusBox[i].height,
						fixed: true,
						pos: vec2(bonusBox[i].posX, interfaceTextPosY),
						gradient: [Color.fromHex('#B5F1FA'), Color.fromHex('#FFFFFF')],
						horizontal: true,
						opacity: 0.4
					});
				}, () => {
					drawRect({
						width: bonusBox[i].width,
						height: bonusBox[i].height,
						fixed: true,
						pos: vec2(bonusBox[i].posX, interfaceTextPosY),
						radius: 10
					});
				});
				drawText({
					text: activeBonuses[i].value,
					size: interfaceTextSize,
					font: 'Inter',
					align: 'right',
					width: bonusBox[i].width - interfaceTextSize * 0.1,
					pos: vec2(bonusBox[i].posX + 1, interfaceTextPosY + interfaceTextSize * 0.1 + 1),
					color: Color.fromHex('#343434'),
					fixed: true
				});
				drawText({
					text: activeBonuses[i].value,
					size: interfaceTextSize,
					font: 'Inter',
					align: 'right',
					width: bonusBox[i].width - interfaceTextSize * 0.1,
					pos: vec2(bonusBox[i].posX, interfaceTextPosY + interfaceTextSize * 0.1),
					color: rgb(255, 255, 255),
					fixed: true
				});
				drawSprite({
					sprite: activeBonuses[i].sprite,
					height: bonusBox[i].height * 1.3,
					fixed: true,
					pos: vec2(bonusBox[i].posX - bonusBox[i].height * 0.15, interfaceTextPosY - bonusBox[i].height * 0.15)
				});
			}
			
			// computer
			let contourPosition = {
				x: gameWidth * 0.85,
				y: gameHeight * 0.15,
				width: 240 * scaleCoef
			};
			if(player.collectedParts.isComplete()) {
				drawSprite({
					sprite: 'computer-complete',
					width: contourPosition.width,
					fixed: true,
					pos: vec2(contourPosition.x, contourPosition.y)
				});
			} else {
				drawSprite({
					sprite: 'computer-contour',
					width: contourPosition.width,
					fixed: true,
					pos: vec2(contourPosition.x, contourPosition.y)
				});
				if(player.collectedParts.mouse) {
					drawSprite({
						sprite: 'computer-mouse',
						width: contourPosition.width * 0.3,
						fixed: true,
						pos: vec2(contourPosition.x + 164 * scaleCoef, contourPosition.y + 118 * scaleCoef)
					});
				}
				if(player.collectedParts.comp) {
					drawSprite({
						sprite: 'computer-case',
						width: contourPosition.width * 0.57,
						fixed: true,
						pos: vec2(contourPosition.x + 122 * scaleCoef, contourPosition.y + 18 * scaleCoef)
					});
				}
				if(player.collectedParts.monitor) {
					drawSprite({
						sprite: 'computer-monitor',
						width: contourPosition.width * 0.75,
						fixed: true,
						pos: vec2(contourPosition.x + -10 * scaleCoef, contourPosition.y + 8 * scaleCoef)
					});
				}
				if(player.collectedParts.keyboard) {
					drawSprite({
						sprite: 'computer-keyboard',
						width: contourPosition.width * 0.77,
						fixed: true,
						pos: vec2(contourPosition.x + 20 * scaleCoef, contourPosition.y + 89 * scaleCoef)
					});
				}
			}
		});
		
		let levelTime = 0;
		// check any timers every second
		loop(1, () => {
			if(player.doubleTimer.time > 0) player.doubleTimer.tick(1);
			if(player.shieldTimer.time > 0) player.shieldTimer.tick(1);

			map.get('interactable').forEach(e => {
				if(e.isActive) {
					e.repairTimer.tick(1);
					e.get('progress-bar').forEach(r => {r.get('bar').forEach(b => {b.width = (r.boxWidth - 2) * ((5 - e.repairTimer.time) / 5)})});
				}
			});
			
			// DEBUG - level timer
			levelTime++;
			//console.log(levelTime);
			
			map.get('danger-arc').forEach(tile => {tile.chargeTimer.tick(1)});
			map.get('danger-transformer').forEach(tile => {tile.chargeTimer.tick(1)});
			map.get('danger-move').forEach(tile => {tile.moveTimer.tick(1)});
			
			return;
		});
		
		// player after hit blink
		loop(0.25, () => {
			if(player.afterHit) player.opacity = !player.opacity;
		});
		
		// ----- PLAYER CONTROLS -----
		
		/*--- MOVE RIGHT ---*/
		onKeyDown('right', () => {
			if(!player.isBlocked) {
				if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded()) {
					player.use(selectedCharacter.sprites.run);
					player.play(selectedCharacter.animations.run);
				}
				
				if(player.direction !== 'right') player.direction = 'right';
				if(player.canMove.right) {
					player.move(player.speed, 0);
					updateTiles(map, player);
				}
				player.isIdle = false;
			}
		});
		
		onKeyRelease('right', () => {
			if(!player.isBlocked) {
				player.use(selectedCharacter.sprites.idle);
				player.isIdle = true;
			}
		});
		
		onKeyDown('d', () => {
			if(!player.isBlocked) {
				if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded()) {
					player.use(selectedCharacter.sprites.run);
					player.play(selectedCharacter.animations.run);
				}
				
				if(player.direction !== 'right') player.direction = 'right';
				if(player.canMove.right) {
					player.move(player.speed, 0);
					updateTiles(map, player);
				}
				player.isIdle = false;
			}
		});
		
		onKeyRelease('d', () => {
			if(!player.isBlocked) {
				player.use(selectedCharacter.sprites.idle);
				player.isIdle = true;
			}
		});
		
		onKeyDown('в', () => {
			if(!player.isBlocked) {
				if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded()) {
					player.use(selectedCharacter.sprites.run);
					player.play(selectedCharacter.animations.run);
				}
				
				if(player.direction !== 'right') player.direction = 'right';
				if(player.canMove.right) {
					player.move(player.speed, 0);
					updateTiles(map, player);
				}
				player.isIdle = false;
			}
		});
		
		onKeyRelease('в', () => {
			if(!player.isBlocked) {
				player.use(selectedCharacter.sprites.idle);
				player.isIdle = true;
			}
		});
		/*--- MOVE RIGHT ---*/
		
		/*--- MOVE LEFT ---*/
		onKeyDown('left', () => {
			if(!player.isBlocked) {
				if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded()) {
					player.use(selectedCharacter.sprites.run);
					player.play(selectedCharacter.animations.run);
				}
				
				if(player.direction !== 'left') player.direction = 'left';
				if(player.canMove.left) {
					player.move(-player.speed, 0);
					updateTiles(map, player);
				}

				player.isIdle = false;
				
			}
		});
		
		onKeyRelease('left', () => {
			if(!player.isBlocked) {
				player.use(selectedCharacter.sprites.idle);
				player.isIdle = true;
			}
		});
		
		onKeyDown('a', () => {
			if(!player.isBlocked) {
				if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded()) {
					player.use(selectedCharacter.sprites.run);
					player.play(selectedCharacter.animations.run);
				}
				
				if(player.direction !== 'left') player.direction = 'left';
				if(player.canMove.left) {
					player.move(-player.speed, 0);
					updateTiles(map, player);
				}

				player.isIdle = false;
				
			}
		});
		
		onKeyRelease('a', () => {
			if(!player.isBlocked) {
				player.use(selectedCharacter.sprites.idle);
				player.isIdle = true;
			}
		});
		
		onKeyDown('ф', () => {
			if(!player.isBlocked) {
				if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded()) {
					player.use(selectedCharacter.sprites.run);
					player.play(selectedCharacter.animations.run);
				}
				
				if(player.direction !== 'left') player.direction = 'left';
				if(player.canMove.left) {
					player.move(-player.speed, 0);
					updateTiles(map, player);
				}

				player.isIdle = false;
				
			}
		});
		
		onKeyRelease('ф', () => {
			if(!player.isBlocked) {
				player.use(selectedCharacter.sprites.idle);
				player.isIdle = true;
			}
		});
		/*--- MOVE LEFT ---*/
		
		/*--- JUMP ---*/
		onKeyPress('up', () => {
			if(!player.isBlocked) {
				if(player.isGrounded()) {
					player.jump(JUMP_FORCE);
					player.use(selectedCharacter.sprites.jump);
					player.isIdle = false;
				}
			}
		});
		
		onKeyPress('w', () => {
			if(!player.isBlocked) {
				if(player.isGrounded()) {
					player.jump(JUMP_FORCE);
					player.use(selectedCharacter.sprites.jump);
					player.isIdle = false;
				}
			}
		});
		
		onKeyPress('ц', () => {
			if(!player.isBlocked) {
				if(player.isGrounded()) {
					player.jump(JUMP_FORCE);
					player.use(selectedCharacter.sprites.jump);
					player.isIdle = false;
				}
			}
		});
		
		onKeyPress('space', () => {
			if(!player.isBlocked) {
				if(player.isGrounded()) {
					player.jump(JUMP_FORCE);
					player.use(selectedCharacter.sprites.jump);
					player.isIdle = false;
				}
			}
		});
		
		/*--- JUMP ---*/
		
		let maxEffects = 10;
		let collectableEffects = [];
		for(let i = 0; i < maxEffects; i++) {
			collectableEffects.push(add([
				'effect',
				//sprite('score', {width: 50}),
				fixed(),
				anchor('center'),
				{
					speed: 70,
					free: true,
					ttl: 2
				}
			]));
			collectableEffects[i].hidden = true;
			collectableEffects[i].add([
				'effect-value',
				text('+1', {
					font: 'Inter',
					size: 32,
					color: Color.WHITE,
					align: 'left'
				}),
				fixed(),
				anchor('center'),
				pos(vec2(55, 0))
			]);
		}
		
		// collect score
		player.onCollide('collectable-score', obj => {
			let score = player.isDouble() ? SETTINGS.score.coin * 2 : SETTINGS.score.coin;
			player.score += score;
			checkScore(player);
			play('score');
			
			
			let effect = null;
			for(let i = 0; i < maxEffects; i++) {
				if(collectableEffects[i].free) effect = collectableEffects[i];
			}
			if(!effect) return;
			effect.free = false;
			effect.hidden = false;
			effect.use(pos(player.screenPos().x, player.screenPos().y));
			effect.use(sprite('score', {width: 50}));
			effect.get('effect-value')[0].text = '+' + score;
			wait(effect.ttl, () => {
				effect.free = true;
				effect.hidden = true;
			});
			
			destroy(obj);
		});
		
		// collect life
		player.onCollide('collectable-life', obj => {
			if(player.hp() < player.maxHealth) player.heal(1);
			play('bonus');
			
			let effect = null;
			for(let i = 0; i < maxEffects; i++) {
				if(collectableEffects[i].free) effect = collectableEffects[i];
			}
			if(!effect) return;
			effect.free = false;
			effect.hidden = false;
			effect.use(pos(player.screenPos().x, player.screenPos().y));
			effect.use(sprite('heart-outline', {width: 40}));
			effect.get('effect-value')[0].text = '+1';
			wait(effect.ttl, () => {
				effect.free = true;
				effect.hidden = true;
			});
			
			destroy(obj);
		});
		
		// danger
		player.onCollide('danger-top', (obj, e) => {
			if(e.isBottom()) playerDamage(player, obj, maxEffects, collectableEffects);
		});
		player.onCollide('danger-move', (obj, e) => {
			if(e.isTop()) playerDamage(player, obj, maxEffects, collectableEffects);
		});
		
		player.onCollide('danger', (obj, e) => playerDamage(player, obj, maxEffects, collectableEffects));
		player.onCollide('arc-effect', (obj, e) => playerDamage(player, obj, maxEffects, collectableEffects));
		player.onCollideUpdate('arc-effect', (obj, e) => playerDamage(player, obj, maxEffects, collectableEffects));
		player.onCollideUpdate('transformer-explode', (obj, e) => playerDamage(player, obj, maxEffects, collectableEffects));
		
		// WIN
		player.onCollide('win', (obj, e) => {
			// if comp is not complete, show text for 3 sec, return
			if(!player.collectedParts.isComplete()) {
				obj.get('text').forEach(el => {
					if(el.hidden) {
						el.hidden = false; 
						wait(3, () => {
							el.hidden = true;
						});
					}
				});
				return;
			}
			player.isBlocked = true;
			bgx.paused = true;
			map.get('danger-arc').forEach(tile => {tile.sfx.paused = true;});
			map.get('danger-transformer').forEach(tile => {tile.sfx.paused = true;});
			
			play('win');
			wait(2, () => {
				volume(0);
				go("win", player.score);
			});
		});
		
		// bonus +1 health
		player.onCollide('bonus-health', (obj, e) => {
			player.maxHealth++;
			player.heal(1);
			play('bonus');
			
			let effect = null;
			for(let i = 0; i < maxEffects; i++) {
				if(collectableEffects[i].free) effect = collectableEffects[i];
			}
			if(!effect) return;
			effect.free = false;
			effect.hidden = false;
			effect.use(pos(player.screenPos().x, player.screenPos().y));
			effect.use(sprite('bonus-maxHealth', {width: 40}));
			effect.get('effect-value')[0].text = '';
			wait(effect.ttl, () => {
				effect.free = true;
				effect.hidden = true;
			});
			
			destroy(obj);
		});
		
		// bonus double points
		player.onCollide('bonus-double', (obj, e) => {
			player.doubleTimer.time += 30;
			player.doubleTimer.finished = false;
			player.doubleTimer.paused = false;
			play('bonus');
			
			let effect = null;
			for(let i = 0; i < maxEffects; i++) {
				if(collectableEffects[i].free) effect = collectableEffects[i];
			}
			if(!effect) return;
			effect.free = false;
			effect.hidden = false;
			effect.use(pos(player.screenPos().x, player.screenPos().y));
			effect.use(sprite('bonus-double', {width: 40}));
			effect.get('effect-value')[0].text = '+30';
			wait(effect.ttl, () => {
				effect.free = true;
				effect.hidden = true;
			});
			
			destroy(obj);
		});
		
		// bonus shield
		player.onCollide('bonus-shield', (obj, e) => {
			player.shieldTimer.time += 30;
			player.shieldTimer.finished = false;
			player.shieldTimer.paused = false;
			play('bonus');
			
			let effect = null;
			for(let i = 0; i < maxEffects; i++) {
				if(collectableEffects[i].free) effect = collectableEffects[i];
			}
			if(!effect) return;
			effect.free = false;
			effect.hidden = false;
			effect.use(pos(player.screenPos().x, player.screenPos().y));
			effect.use(sprite('bonus-shield', {width: 40}));
			effect.get('effect-value')[0].text = '+30';
			wait(effect.ttl, () => {
				effect.free = true;
				effect.hidden = true;
			});
			
			destroy(obj);
		});
		
		/* --- INTERACTIONS WITH OBJECTS --- */		
		player.onCollide('interactable', (obj, e) => {
			obj.isInteractable = true;
		});
		
		player.onCollideEnd('interactable', (obj, e) => {
			obj.isInteractable = false;
		});
		
		onKeyPress('enter', () => {
			let interactable = get('interactable',{ recursive: true });
			interactable.forEach(obj => {
				if(player.isColliding(obj)) {
					if(obj.isInteractable && !obj.isRepaired && !player.isBlocked) {
						let repairSfx = play('repair', {loop: true});
						player.isBlocked = true; //block player for the duration of repair
						obj.get('repair-cloud').forEach(e => {e.hidden = false; e.play('repair-anim');console.log(1)});
						obj.get('progress-bar').forEach(e => {e.hidden = false});
						obj.get('text').forEach(e => {e.destroy()});
						obj.repairTimer.action = () => {
							obj.use(sprite(obj.spriteRepaired, {width: 60}));
							obj.use(pos(obj.parent.tileWidth() * obj.tilePos.x, obj.parent.tileHeight() * (obj.tilePos.y + 1) + 2));
							obj.use(z(-1));
							obj.isInteractable = false;
							obj.isRepaired = true;
							obj.isActive = false;
							obj.get('sign').forEach(e => {e.destroy()});
							obj.get('repair-cloud').forEach(e => {e.destroy()});
							obj.get('progress-bar').forEach(e => {e.destroy()});
							player.isBlocked = false;
							let score = player.isDouble() ? SETTINGS.score.interactable * 2 : SETTINGS.score.interactable;
							player.score += score;
							checkScore(player);
							repairSfx.paused = true;
							
							let effect = null;
							for(let i = 0; i < maxEffects; i++) {
								if(collectableEffects[i].free) effect = collectableEffects[i];
							}
							if(!effect) return;
							effect.free = false;
							effect.hidden = false;
							effect.use(pos(player.screenPos().x, player.screenPos().y));
							effect.use(sprite('score', {width: 50}));
							effect.get('effect-value')[0].text = '+' + score;
							wait(effect.ttl, () => {
								effect.free = true;
								effect.hidden = true;
							});
							
							//destroy(repairSfx);
							return false;
						}
						obj.isActive = true;
					}
				}
			});
			
		});
		
		onClick('interactable', obj => {
			if(obj.isInteractable && !obj.isRepaired && !player.isBlocked) {
				let repairSfx = play('repair', {loop: true});
				player.isBlocked = true; //block player for the duration of repair
				obj.get('repair-cloud').forEach(e => {e.hidden = false; e.play('repair-anim');});
				obj.get('progress-bar').forEach(e => {e.hidden = false});
				obj.get('text').forEach(e => {e.destroy()});
				obj.repairTimer.action = () => {
					obj.use(sprite(obj.spriteRepaired, {width: 60}));
					obj.use(pos(obj.parent.tileWidth() * obj.tilePos.x, obj.parent.tileHeight() * (obj.tilePos.y + 1) + 2));
					obj.use(z(-1));
					obj.isInteractable = false;
					obj.isRepaired = true;
					obj.isActive = false;
					obj.get('sign').forEach(e => {e.destroy()});
					obj.get('repair-cloud').forEach(e => {e.destroy()});
					obj.get('progress-bar').forEach(e => {e.destroy()});
					player.isBlocked = false;
					let score = player.isDouble() ? SETTINGS.score.interactable * 2 : SETTINGS.score.interactable;
					player.score += score;
					checkScore(player);
					repairSfx.paused = true;
					
					let effect = null;
					for(let i = 0; i < maxEffects; i++) {
						if(collectableEffects[i].free) effect = collectableEffects[i];
					}
					if(!effect) return;
					effect.free = false;
					effect.hidden = false;
					effect.use(pos(player.screenPos().x, player.screenPos().y));
					effect.use(sprite('score', {width: 50}));
					effect.get('effect-value')[0].text = '+' + score;
					wait(effect.ttl, () => {
						effect.free = true;
						effect.hidden = true;
					});
					
					//destroy(repairSfx);
					return false;
				}
				obj.isActive = true;
			}
		});
		player.on("death", () => {
			bgx.paused = true;
			
			map.get('danger-arc').forEach(tile => {tile.sfx.paused = true;});
			map.get('danger-transformer').forEach(tile => {tile.sfx.paused = true;});
			play('lose');
			volume(0);
			go("restart", player.score);
		});
		
		onDestroy('danger-transformer', obj => {
			obj.sfx.paused = true;
		});
		onDestroy('danger-arc', obj => {
			obj.sfx.paused = true;
		});
		
		// camera setup
		camScale(1.2);
		const cameraLeftBound = 6.25 * tileSize * mapScale;
		const cameraRightBound = 135.75 * tileSize * mapScale;
		let cameraVerticalOffset = Math.round(player.pos.y - 100);
		
		// ----- GAME UPDATE LOOP -----
		onUpdate(() => {
			console.log(btnLeft,btnRight)
			player.heightDelta = player.previousHeight ? player.previousHeight - player.pos.y : 0;
			player.previousHeight = player.pos.y;

			if(player.isGrounded()) {
				player.pos.y = Math.round(player.previousHeight);
			}
			cameraVerticalOffset = Math.round(player.pos.y - 100 * scaleCoef);
			if(cameraLeftBound > player.pos.x) {
				camPos(cameraLeftBound, cameraVerticalOffset);
			} else if(cameraRightBound < player.pos.x) {
				camPos(cameraRightBound, cameraVerticalOffset);
			} else {
				camPos(Math.round(player.pos.x), cameraVerticalOffset);
			}

			if(player.curAnim() !== selectedCharacter.animations.run && player.isGrounded() && !player.frame) {
				if(!player.isIdle) player.use(selectedCharacter.sprites.idle);
				player.isIdle = true;
			}

			player.flipX = (player.direction === 'left') ? true : false;
			
			for(let i = 0; i < maxEffects; i++) {
				if(!collectableEffects[i].free) collectableEffects[i].move(0, -1 * collectableEffects[i].speed);
			}
			map.get('danger-move').forEach(tile => {
				tile.move(vec2(0, tile.reverse ? tile.speed : -1 * tile.speed));
			});
		});
	});
	
	// RESTART SCREEN
	scene("restart", (score) => {
		onUpdate('cloud', obj => {
			obj.move(-obj.speed, 0);
			if(obj.pos.x < -1 * (obj.width / 2 + 5)) {
				obj.pos.x = gameWidth * (1 + randi(7,50) / 100);
				obj.width = 300 * (randi(50, 150) / 100);
				obj.speed = randi(2,8) * 10,
				obj.flipX = rand(10) > 5 ? true : false;
			}
		});
		
		let boxWidth = Math.min(800, gameWidth * 0.8);
		let boxPos = vec2(gameWidth / 2, gameHeight * 0.3);
		onDraw(() => {
			drawRect({
				width: boxWidth,
				height: Math.min(400, gameWidth * 0.6),
				fixed: true,
				pos: boxPos,
				radius: 20,
				color: Color.WHITE,
				anchor: 'top'
			});
			drawSprite({
				sprite: "screen-lose-heart",
				width: Math.min(180, gameWidth * 0.25),
				fixed: true,
				pos: boxPos,
				anchor: 'center'
			});
			drawText({
				text: 'НЕ УДАЛОСЬ ПОКОРИТЬ ВЕРШИНУ!',
				size: Math.round(60 * scaleCoef),
				font: 'Onest Bold',
				align: 'center',
				width: boxWidth * 0.9,
				pos: vec2(gameWidth / 2, gameHeight * 0.38),
				color: Color.fromHex("#FF7201"),
				fixed: true,
				anchor: 'top'
			});
			
			drawText({
				text: 'Попробуй еще раз',
				size: Math.round(36 * scaleCoef),
				font: 'Onest Black',
				align: 'center',
				width: boxWidth * 0.9,
				pos: vec2(gameWidth / 2, gameHeight * 0.6),
				color: Color.fromHex("#343434"),
				fixed: true,
				anchor: 'top'
			});
		});

		add(["btnReset", sprite('screen-lose-btn', {width: Math.min(150, gameWidth * 0.2)}), pos(gameWidth / 2, gameHeight * 0.9), scale(scaleCoef), anchor('center'),z(1500),fixed(),area()]);
		onClick("btnReset", () => {
			go("start");
		});
	});
	
	// WIN SCREEN
	scene("win", (score) => {		
		onUpdate('cloud', obj => {
			obj.move(-obj.speed, 0);
			if(obj.pos.x < -1 * (obj.width / 2 + 5)) {
				obj.pos.x = gameWidth * (1 + randi(7,50) / 100);
				obj.width = 300 * (randi(50, 150) / 100);
				obj.speed = randi(2,8) * 10,
				obj.flipX = rand(10) > 5 ? true : false;
			}
		});
		
		let boxWidth = Math.min(800, gameWidth * 0.8);
		let boxPos = vec2(gameWidth / 2, gameHeight * 0.3);
		onDraw(() => {
			drawRect({
				width: boxWidth,
				height: Math.min(400, gameWidth * 0.6),
				fixed: true,
				pos: boxPos,
				radius: 20,
				color: Color.WHITE,
				anchor: 'top'
			});
			drawSprite({
				sprite: "screen-win-flag",
				width: Math.min(180, gameWidth * 0.25),
				fixed: true,
				pos: boxPos,
				anchor: 'center'
			});
			drawText({
				text: 'ТЫ НА ВЕРШИНЕ!',
				size: Math.round(80 * scaleCoef),
				font: 'Onest Bold',
				align: 'center',
				width: boxWidth * 0.9,
				pos: vec2(gameWidth / 2, gameHeight * 0.38),
				color: Color.fromHex("#FF7201"),
				fixed: true,
				anchor: 'top'
			});
			drawText({
				text: 'Поздравляем, весь маршрут пройден!',
				size: Math.round(36 * scaleCoef),
				font: 'Onest Black',
				align: 'center',
				width: boxWidth * 0.9,
				pos: vec2(gameWidth / 2, gameHeight * 0.5),
				color: Color.fromHex("#343434"),
				fixed: true,
				anchor: 'top'
			});
			
			drawText({
				text: 'Твой счет: '+score,
				size: Math.round(36 * scaleCoef),
				font: 'Onest Black',
				align: 'center',
				width: boxWidth * 0.9,
				pos: vec2(gameWidth / 2, gameHeight * 0.65),
				color: Color.fromHex("#343434"),
				fixed: true,
				anchor: 'top'
			});
		});

		add(["btnReset", sprite('screen-win-btn', {width: Math.min(300, gameWidth * 0.6)}), pos(gameWidth / 2, gameHeight * 0.9), scale(scaleCoef), anchor('center'),z(1500),fixed(),area()]);
		onClick("btnReset", () => {
			go("start");
		});
	});
	
	go("start");
	
	// check score to add computer parts
	function checkScore(player) {
		if(player.score >= SETTINGS.score.parts.monitor) {
			if(!player.collectedParts.monitor) player.collectedParts.monitor = true;
			if(!player.collectedParts.comp) player.collectedParts.comp = true;
			if(!player.collectedParts.mouse) player.collectedParts.mouse = true;
			if(!player.collectedParts.keyboard) player.collectedParts.keyboard = true;
		}
		else if(player.score >= SETTINGS.score.parts.comp) {
			if(!player.collectedParts.comp) player.collectedParts.comp = true;
			if(!player.collectedParts.mouse) player.collectedParts.mouse = true;
			if(!player.collectedParts.keyboard) player.collectedParts.keyboard = true;
		}
		else if(player.score >= SETTINGS.score.parts.mouse) {
			if(!player.collectedParts.mouse) player.collectedParts.mouse = true;
			if(!player.collectedParts.keyboard) player.collectedParts.keyboard = true;
		}
		else if(player.score >= SETTINGS.score.parts.keyboard && !player.collectedParts.keyboard) player.collectedParts.keyboard = true;
	}

});

function initAssets() {
	// fonts
	loadFont('Onest Black', 'assets/font/Onest/static/Onest-Black.ttf');
	loadFont('Onest Bold', 'assets/font/Onest/static/Onest-Bold.ttf');
	loadFont("Inter", "assets/font/Inter/Inter-Black.woff");
	
	// background
	loadSprite('background-0', `assets/img/game_visual_${gameVisual}/background/background-0.png`);
	loadSprite('background-1', 'assets/img/game_visual_1/background/background-1.png');
	loadSprite('background-2', 'assets/img/game_visual_1/background/background-2.png'); // передний план
	
	loadSprite('cloud', `assets/img/game_visual_${gameVisual}/environment/cloud.png`);
	
	//welcome screen sprites
	loadSprite('screenWelcomeLogo', `assets/img/game_visual_${gameVisual}/screens/welcome/logo.png`);
	loadSprite('screenWelcomeCaption', `assets/img/game_visual_${gameVisual}/screens/welcome/caption.png`);
	loadSprite('screenWelcomeBtn', `assets/img/game_visual_${gameVisual}/screens/welcome/btn_v2.png`);
	
	//tutorial
	loadSprite('screenTutorialContent', `assets/img/game_visual_${gameVisual}/screens/tutorial/tutorial_complete.png`);
	loadSprite('screenTutorialBtnContinue', `assets/img/game_visual_${gameVisual}/screens/tutorial/btn_continue.png`);
	loadSprite('screenTutorialBtnClose', `assets/img/game_visual_${gameVisual}/screens/tutorial/btn_close.png`);
	loadSprite('screenTutorialBtnOpen', `assets/img/game_visual_${gameVisual}/screens/tutorial/btn_open.png`);
	
	//select screen sprites
	loadSprite('screenSelectLogo', `assets/img/game_visual_${gameVisual}/screens/select/logo_small.png`);
	loadSprite('screenSelectBtnPrevNext', `assets/img/game_visual_${gameVisual}/screens/select/btn_prev_next.png`);
	loadSprite('screenSelectBtnStart', `assets/img/game_visual_${gameVisual}/screens/select/btn_select.png`);
	loadSprite('designChangeBtn', `assets/img/game_visual_${gameVisual}/screens/tutorial/btn.png`);
	loadSprite('btnUp', `assets/img/game_visual_${gameVisual}/buttons/btn_up.png`);
	loadSprite('btnLeft', `assets/img/game_visual_${gameVisual}/buttons/btn_left.png`);
	loadSprite('btnRight', `assets/img/game_visual_${gameVisual}/buttons/btn_right.png`);
	loadSprite('btnEnter', `assets/img/game_visual_${gameVisual}/buttons/btn_enter.png`);
	
	// ground tiles
	loadSpriteAtlas(`assets/img/game_visual_${gameVisual}/environment/tileset.png`, {
		'ground-top-left': {x: 0, y: 0, width: 224, height: 224},
		'ground-top-right': {x: 448, y: 0, width: 224, height: 224},
		'ground-top-center': {x: 224, y: 0, width: 224, height: 224},
		'ground-deep-1': {x: 0, y: 224, width: 224, height: 224},
		'ground-deep-2': {x: 224, y: 224, width: 224, height: 224},
	});
	
	// environment
	loadSprite('platform', `assets/img/game_visual_${gameVisual}/environment/platform.png`);
	loadSprite('spikes_bottom', `assets/img/game_visual_${gameVisual}/environment/spikes_bottom.png`);
	loadSprite('spikes_top', `assets/img/game_visual_${gameVisual}/environment/spikes_top.png`);
	loadSprite('wires', `assets/img/game_visual_${gameVisual}/environment/wires.png`);
	loadSprite('effect-scull', `assets/img/game_visual_${gameVisual}/effects/danger_scull.png`);
	loadSprite('arc-ball', `assets/img/game_visual_${gameVisual}/environment/arc_ball.png`);
	loadSprite('arc-effect', `assets/img/game_visual_${gameVisual}/environment/arc_lightning.png`);
	loadSprite('transformer', `assets/img/game_visual_${gameVisual}/environment/transformer.png`);
	loadSprite('transformer-explode', `assets/img/game_visual_${gameVisual}/environment/explode.png`, {
		sliceX: 4, sliceY: 1,
		anims: {'explode-anim': {from: 0, to: 3, loop: true}}
	});

		// characters
	loadSprite('char1_idle', `assets/img/game_visual_${gameVisual}/character/char_1_idle.png`);
	loadSprite('char1_big', `assets/img/game_visual_${gameVisual}/character/char_1_big.png`);
	loadSprite('char1_jump', `assets/img/game_visual_${gameVisual}/character/char_1_jump.png`);
	loadSprite('char1_walk', `assets/img/game_visual_${gameVisual}/character/char_1_walk.png`, {
		sliceX: 4, sliceY: 1,
		anims: {'char1-walk-anim': {from: 0, to: 3, loop: true}}
	});
	
	loadSprite('char2_idle', `assets/img/game_visual_${gameVisual}/character/char_2_idle.png`);
	loadSprite('char2_big', `assets/img/game_visual_${gameVisual}/character/char_2_big.png`);
	loadSprite('char2_jump', `assets/img/game_visual_${gameVisual}/character/char_2_jump.png`);
	loadSprite('char2_walk', `assets/img/game_visual_${gameVisual}/character/char_2_walk.png`, {
		sliceX: 4, sliceY: 1,
		anims: {'char2-walk-anim': {from: 0, to: 3, loop: true}}
	});
	
	loadSprite('char3_idle', `assets/img/game_visual_${gameVisual}/character/char_3_idle.png`);
	loadSprite('char3_big', `assets/img/game_visual_${gameVisual}/character/char_3_big.png`);
	loadSprite('char3_jump', `assets/img/game_visual_${gameVisual}/character/char_3_jump.png`);
	loadSprite('char3_walk', `assets/img/game_visual_${gameVisual}/character/char_3_walk.png`, {
		sliceX: 4, sliceY: 1,
		anims: {'char3-walk-anim': {from: 0, to: 3, loop: true}}
	});
	
	// objects
	loadSprite('score', `assets/img/game_visual_${gameVisual}/objects/score.png`);
	loadSprite('heart', `assets/img/game_visual_${gameVisual}/objects/heart.png`);
	loadSprite('heart-outline', `assets/img/game_visual_${gameVisual}/objects/heart_outline.png`);
	loadSprite('heart-empty', `assets/img/game_visual_${gameVisual}/objects/heart_empty.png`);
	loadSprite('bonus-maxHealth', `assets/img/game_visual_${gameVisual}/objects/bonus_max_health.png`);
	loadSprite('bonus-double', `assets/img/game_visual_${gameVisual}/objects/bonus_double.png`);
	loadSprite('bonus-shield', `assets/img/game_visual_${gameVisual}/objects/bonus_shield.png`);
	
	loadSprite('computer-contour', `assets/img/game_visual_${gameVisual}/objects/computer_contour.png`);
	loadSprite('computer-complete', `assets/img/game_visual_${gameVisual}/objects/computer_contour_complete.png`);
	loadSprite('computer-keyboard', `assets/img/game_visual_${gameVisual}/objects/computer_keyboard.png`);
	loadSprite('computer-keyboard-collectible', `assets/img/game_visual_${gameVisual}/objects/computer_keyboard_collectible.png`);
	loadSprite('computer-monitor', `assets/img/game_visual_${gameVisual}/objects/computer_monitor.png`);
	loadSprite('computer-monitor-collectible', `assets/img/game_visual_${gameVisual}/objects/computer_monitor_collectible.png`);
	loadSprite('computer-mouse', `assets/img/game_visual_${gameVisual}/objects/computer_mouse.png`);
	loadSprite('computer-mouse-collectible', `assets/img/game_visual_${gameVisual}/objects/computer_mouse_collectible.png`);
	loadSprite('computer-case', `assets/img/game_visual_${gameVisual}/objects/computer_case.png`);
	
	loadSprite('workstation-1', `assets/img/game_visual_${gameVisual}/objects/workstation_1.png`);
	loadSprite('workstation-1-broken', `assets/img/game_visual_${gameVisual}/objects/workstation_1_broken.png`);
	loadSprite('workstation-2', `assets/img/game_visual_${gameVisual}/objects/workstation_2.png`);
	loadSprite('workstation-2-broken', `assets/img/game_visual_${gameVisual}/objects/workstation_2_broken.png`);
	loadSprite('workstation-3', `assets/img/game_visual_${gameVisual}/objects/workstation_3.png`);
	loadSprite('workstation-3-broken', `assets/img/game_visual_${gameVisual}/objects/workstation_3_broken.png`);
	loadSprite('repair-sign', `assets/img/game_visual_${gameVisual}/effects/repair_sign.png`);
	loadSprite('repair-sign-2', `assets/img/game_visual_${gameVisual}/effects/repair_sign_2.png`);
	loadSprite('repair-text', `assets/img/game_visual_${gameVisual}/effects/repair_text.png`);
	loadSprite('repair-cloud', `assets/img/game_visual_${gameVisual}/effects/repair_cloud_r.png`, {
		sliceX: 4, sliceY: 1,
		anims: {'repair-anim': {from: 0, to: 3, loop: true}}
	});
	
	loadSprite('win-flag', `assets/img/game_visual_${gameVisual}/objects/win_flag.png`);
	loadSprite('screen-win-flag', `assets/img/game_visual_${gameVisual}/screens/endgame/flag_win.png`);
	loadSprite('screen-win-btn', `assets/img/game_visual_${gameVisual}/screens/endgame/btn_win.png`);
	loadSprite('screen-lose-heart', `assets/img/game_visual_${gameVisual}/screens/endgame/heartbreak_lose.png`);
	loadSprite('screen-lose-btn', `assets/img/game_visual_${gameVisual}/screens/endgame/btn_lose.png`);
	
	// SFX
	
	loadSound('score', 'assets/sfx/score.mp3');
	loadSound('bonus', 'assets/sfx/bonus.mp3');
	loadSound('win', 'assets/sfx/win.mp3');
	loadSound('lose', 'assets/sfx/lose.mp3');
	loadSound('comp', 'assets/sfx/comp.mp3');
	loadSound('level', 'assets/sfx/level.mp3');
	loadSound('hit', 'assets/sfx/hit.mp3');
	loadSound('repair', 'assets/sfx/repair.mp3');
	loadSound('electric', 'assets/sfx/electric.mp3');
	loadSound('transformer', 'assets/sfx/transformer.mp3');
}

// hide far tiles to prevent performance loss
function updateTiles(map, player, mapScale = 3) {
	map.children.forEach(tile => {
		let threshold = 1700000;
		let tileX = tile.pos.x * mapScale;
		let tileY = tile.pos.y * mapScale;
		let dist = (player.pos.x - tileX) * (player.pos.x - tileX) + (player.pos.y - tileY) * (player.pos.y - tileY);
		if(dist > threshold) {
			tile.hidden = true;
			tile.paused = true;
		} else {
			tile.hidden = false;
			tile.paused = false;
		}
	});
	return;
}

// draw effects upon player taking damage
function playerDamage(player, obj, maxEffects, collectableEffects) {
	if(!player.isShielded() && !obj.hidden && !player.afterHit) {
		play('hit');
		player.hurt(1);

		if(obj.parent.sfx != undefined) {obj.parent.sfx.play();}
		player.afterHit = true;
		
		let effect = null;
		for(let i = 0; i < maxEffects; i++) {
			if(collectableEffects[i].free) effect = collectableEffects[i];
		}
		if(!effect) return;
		effect.free = false;
		effect.hidden = false;
		effect.use(pos(player.screenPos().x, player.screenPos().y));
		effect.use(sprite('heart-empty', {width: 40}));
		effect.get('effect-value')[0].text = '-1';
		wait(effect.ttl, () => {
			effect.free = true;
			effect.hidden = true;
		});
		
		wait(player.afterHitDelay, () => {
			player.afterHit = false;
			player.opacity = 1;
		});
		
		if(obj.parent.sfx != undefined) {
			wait(2, () => obj.parent.sfx.paused = true);
		}
	}
	return false;
}