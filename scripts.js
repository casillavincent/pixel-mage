/*
===============================================================================
* On Load Functions
===============================================================================
*/
window.onload = function () {
   //! Onload Variables
   const curse = $("#curse");
   const char = $("#char");
   const spell = $("#spell");
   const fireball = $("#firebal");
   const melee = $("#melee");
   const tornado = $("#tornado");
   const boss = $("#boss");

   //! Get Character Name
   getCharacterName();

   //! Show HP Of Boss and Char in the beginning
   document.getElementById("boss-hp").innerHTML = "HP: " + bossHP;
   document.getElementById("char-hp").innerHTML = "HP: " + charTotalHP;

   //! Start the multiplier random number timer
   damageMultiplierTimer();

   //!Turn on Boss Skill Timer
   skillTwoInterval();
   skillThreeInterval();

   //! Initial Potion Count
   document.getElementById("hp-pot-counter").innerHTML = healthPotionCount;
   document.getElementById("magic-pot-counter").innerHTML = magicPotionCount;
   document.getElementById("str-pot-counter").innerHTML = strPotionCount;

   //! Start Boss Damage Timer
   randomBossSkillDamageTimer();

   //!Hide Crystal
   $("#crystal").hide();

   //!Hide Replay
   $("#you-win").hide();
   $("#you-lose").hide();

   //! Hide Damage Receieved
   $("#damage-received").hide();

   //!Enter Godmode
   window.document.getElementById("god-mode").addEventListener("click", function () {
      //* Add 99 Potions
      alert(
         "Entering Limbo!!!! Although your magical abilities are powerful here, you enter Kronus' territory.  Watch your HP!"
      ); //!Entering Limbo Alert
      charTotalHP = 9999;
      document.getElementById("char-hp").innerHTML = "HP: " + charTotalHP;
      healthPotionCount = 99;
      strPotionCount = 99;
      magicPotionCount = 99;
      document.getElementById("hp-pot-counter").innerHTML = healthPotionCount;
      document.getElementById("magic-pot-counter").innerHTML = magicPotionCount;
      document.getElementById("str-pot-counter").innerHTML = strPotionCount;

      //* Base Damage
      ice = 999999;
      fire = 999999;
      poison = 99;
      wind = 99;
      sword = 99;

      //* Boss Powerup
      bossHP = +999999999;
      document.getElementById("boss-hp").innerHTML = bossHP;
      skillTwoDamage = 2000;
      skillThreeDamage = 6000;
      burnDamageTimer();

      //* Change BG
      document.getElementById("main-bg").src = "images/bg2.gif";
      document.getElementById("main-bg").style.top = "-230px";

      //* Hide Button
      $("#god-mode").hide();
   });

   //!Mute Sound
   document.getElementById("mute-bg-music").onclick = muteBgMusic;
};
/*
===============================================================================
* Walking Functions
===============================================================================
*/
//! Variables
let stepNumber = 0;
let movingRight = false;
let movingLeft = false;
let moveRightTimer = null;
let moveLeftTimer = null;
let moveRightAnimationTimer = null;
let moveLeftAnimationTimer = null;

//! Animation Right
function moveAnimationRight() {
   stepNumber = stepNumber + 1;
   if (stepNumber >= 3) {
      stepNumber = 0;
   }
   char.src = "images/rightWalk/walk" + stepNumber + ".gif";
}
//! Move Right
function moveRight() {
   char.style.left = parseInt(char.style.left) + 1 + "px";
   alignDamageReceived();
}

//! Animation Left
function moveAnimationLeft() {
   stepNumber = stepNumber + 1;
   if (stepNumber >= 3) {
      stepNumber = 0;
   }
   char.src = "images/leftWalk/walk" + stepNumber + ".gif";
}
//! Move Left
function moveLeft() {
   char.style.left = parseInt(char.style.left) - 1 + "px";
   alignDamageReceived();
}
/*
===============================================================================
* Spells
===============================================================================
*/
//! Spell
let spellTimer = null;
let fireballTimer = null;
let meleeAlignTimer = null;

function spellAlign() {
   //! Align the start of spell with the character
   spell.style.left = parseInt(char.style.left) + "px";
}
function spellRight() {
   //! Shoots spell right
   spell.style.left = parseInt(spell.style.left) + 5 + "px";

   //? Does it hit the Boss?
   if (parseInt(spell.style.left) >= 1140 && parseInt(spell.style.left) <= 1145) {
      spell.style.visibility = "hidden";
      bossHP = bossHP - ice * multiplier;
      updateHP();
      document.getElementById("ice-counter").innerHTML = ice * multiplier;
      $("#ice-counter").show();
      if (multiplier == 0) {
         document.getElementById("ice-counter").innerHTML = "Miss";
      } else if (multiplier > 7) {
         document.getElementById("ice-counter").innerHTML = "Critical!" + ice * multiplier;
      }
   }
}
function spellOff() {
   clearInterval(spellTimer);
   spell.style.visibility = "hidden";
   spellTimer = null;
}

//! Fireball
function fireballAlign() {
   //! Align spell with char
   fireball.style.left = parseInt(char.style.left) + "px";
}
function fireballRight() {
   fireball.style.left = parseInt(fireball.style.left) + 3 + "px";

   //? Does it hit the Boss?
   if (parseInt(fireball.style.left) >= 1140 && parseInt(fireball.style.left) <= 1142) {
      fireball.style.visibility = "hidden";
      bossHP = bossHP - fire * multiplier;
      updateHP();
      document.getElementById("fire-counter").innerHTML = fire * multiplier;
      $("#fire-counter").show();
      if (multiplier == 0) {
         document.getElementById("fire-counter").innerHTML = "Miss";
      } else if (multiplier > 7) {
         document.getElementById("fire-counter").innerHTML = "Critical!" + fire * multiplier;
      }
   }
}
function fireballOff() {
   clearInterval(fireballTimer);
   fireball.style.visibility = "hidden";
   fireballTimer = null;
}

//! Curse
let curseTimer = null;
function curseAlign() {
   //! Align the start of curse with the character
   curse.style.left = parseInt(char.style.left) - 80 + "px";
}
function curseRight() {
   //! Shoots curse right
   curse.style.left = parseInt(curse.style.left) + 5 + "px";

   //? Does it hit the Boss?
   if (parseInt(curse.style.left) >= 1140 && parseInt(curse.style.left) <= 1600) {
      bossHP = bossHP - poison * multiplier;
      updateHP();
      document.getElementById("curse-counter").innerHTML = poison * multiplier * 92;
      $("#curse-counter").show();
      if (multiplier == 0) {
         document.getElementById("curse-counter").innerHTML = "Miss";
      } else if (multiplier > 7) {
         document.getElementById("curse-counter").innerHTML = "Critical!" + poison * multiplier;
      }
   }
}
function curseOff() {
   clearInterval(curseTimer);
   curse.style.visibility = "hidden";
   curseTimer = null;
}

//! Melee
function meleeAlign() {
   melee.style.left = parseInt(char.style.left) - 25 + "px";

   //? Does it hit the Boss?
   if (parseInt(melee.style.left) >= 1000 && parseInt(melee.style.left) <= 1600) {
      bossHP = bossHP - sword * multiplier;
      updateHP();
      document.getElementById("melee-counter").innerHTML = sword * multiplier * 100;
      $("#melee-counter").show();
      if (multiplier == 0) {
         document.getElementById("melee-counter").innerHTML = "Miss";
      } else if (multiplier > 7) {
         document.getElementById("melee-counter").innerHTML =
            "Critical!" + sword * multiplier * 100;
      }
   }
}

function meleeOff() {
   melee.style.visibility = "hidden";
   clearInterval(meleeAlignTimer);
}

//! Tornado
let tornadoTimer = null;

function tornadoAlign() {
   //! Align the tornado with the start of spell with the character
   tornado.style.left = parseInt(char.style.left) - 100 + "px";
}
function tornadoRight() {
   //! Shoots spell right
   tornado.style.left = parseInt(tornado.style.left) + 5 + "px";

   //? Does it hit the Boss?
   if (parseInt(tornado.style.left) >= 1140 && parseInt(tornado.style.left) <= 1540) {
      bossHP = bossHP - wind * multiplier;
      updateHP();
      document.getElementById("tornado-counter").innerHTML = wind * multiplier * 80;
      $("#tornado-counter").show();
      if (multiplier == 0) {
         document.getElementById("tornado-counter").innerHTML = "Miss";
      } else if (multiplier > 7) {
         document.getElementById("tornado-counter").innerHTML = "Critical!" + wind * multiplier;
      }
   }
}
function tornadoOff() {
   clearInterval(tornadoTimer);
   tornado.style.visibility = "hidden";
   tornadoTimer = null;
}

/* 
===============================================================================
* Hide Boss Damage Received
===============================================================================
*/
function hideBossDamageIndicator() {
   $("#ice-counter").fadeOut("fast");
   $("#fire-counter").fadeOut("fast");
   $("#curse-counter").fadeOut("fast");
   $("#tornado-counter").fadeOut("fast");
   $("#melee-counter").fadeOut("fast");
}

hideBossDamageTimer = setInterval(hideBossDamageIndicator, 5000);

/* 
===============================================================================
* Controls
===============================================================================
*/
//! KEYPRESS
document.onkeypress = spellOn;
function spellOn(e) {
   //!Ice Bolt
   if (e.which == 97) {
      if (spellTimer == null) {
         document.getElementById("ice-sound").play();

         spell.style.visibility = "visible";
         spellAlign();
         spellTimer = setInterval(spellRight, 0.5);
         setTimeout(spellOff, 750);
      }
   }
   //!Fireball
   else if (e.which == 115) {
      if (fireballTimer == null) {
         document.getElementById("fire-sound").play();
         fireball.style.visibility = "visible";
         fireballAlign();
         fireballTimer = setInterval(fireballRight, 0.5);
         setTimeout(fireballOff, 1000);
      }
   }
   //!Melee
   else if (e.which == 32) {
      if (meleeAlignTimer == null) {
         document.getElementById("sword-sound").play();
         melee.style.visibility = "visible";
         meleeAlignTimer = setInterval(meleeAlign, 10);
         setTimeout(meleeOff, 1000);
      } else {
         clearInterval(meleeAlignTimer);
         meleeAlignTimer = null;
      }
   }
   //! Curse
   else if (e.which == 102) {
      if (curseTimer == null) {
         document.getElementById("curse-sound").play();
         curse.style.visibility = "visible";
         curseAlign();
         curseTimer = setInterval(curseRight, 15);
         setTimeout(curseOff, 3000);
      }
   }
   //!Tornado
   else if (e.which == 100) {
      if (tornadoTimer == null) {
         document.getElementById("tornado-sound").play();
         tornado.style.visibility = "visible";
         tornadoAlign();
         tornadoTimer = setInterval(tornadoRight, 10);
         setTimeout(tornadoOff, 3000);
      }
   }
   //* Health Potion
   else if (e.which == 49) {
      document.getElementById("potion-sound").play();
      addHPToChar();
      decreaseHealthPotion();
   }
   //* Str Potion
   else if (e.which == 50) {
      document.getElementById("potion-sound").play();
      upgradeBaseMeleeDamage();
      decreaseStrPotionCount();
   }
   //* Health Potion
   else if (e.which == 51) {
      document.getElementById("potion-sound").play();
      upgradeBaseMagicDamage();
      decreaseMagicPotionCount();
   }
}
//! KEYDOWN
window.onkeydown = moveOn;
function moveOn(e) {
   if (e.which == 39) {
      //! Right Arrow
      if (moveRightTimer == null) {
         moveRightTimer = setInterval(moveRight, 0.5);
         moveRightAnimationTimer = setInterval(moveAnimationRight, 100);
         movingRight = true;
      }
   } else if (e.which == 37) {
      //! Left Arrow
      if (moveLeftTimer == null) {
         moveLeftTimer = setInterval(moveLeft, 0.5);
         moveLeftAnimationTimer = setInterval(moveAnimationLeft, 100);
         movingLeft = true;
      }
   }
}
//! KEYUP
window.onkeyup = moveOff;
function moveOff(e) {
   if (e.which == 39) {
      //! Right Arrow
      if (moveRightTimer != null) {
         clearInterval(moveRightTimer);
         clearInterval(moveRightAnimationTimer);
         moveRightTimer = null;
         movingRight = false;
      }
   } else if (e.which == 37) {
      //! Right Arrow
      if (moveLeftTimer != null) {
         clearInterval(moveLeftTimer);
         clearInterval(moveLeftAnimationTimer);
         moveLeftTimer = null;
         movingLeft = false;
      }
   }
}

/* 
===============================================================================
* Health Points
===============================================================================
*/
//! Boss HP
let bossHP = 15000000;
//! Get a Random HP for Character
let hpMultiplier = Math.floor(Math.random() * 10000); //? Random Add to Base HP
let charHP = 999; //? Base HP
var charTotalHP = charHP + hpMultiplier;
console.log("Initial HP: " + charTotalHP);

//! Boss Health innerHTML update
function updateHP() {
   if (bossHP >= 0) {
      document.getElementById("boss-hp").innerHTML = "HP: " + bossHP;
   } else if (bossHP <= 0) {
      //! Sound Effects
      document.getElementById("kronus-dead").play();
      document.getElementById("bg-music").pause();
      document.getElementById("bg-music2").play();

      //! Remove Boss Attributes
      document.getElementById("boss-hp").innerHTML = "Defeated";
      $("#boss").fadeOut("slow");
      spell.style.display = "none";
      curse.style.display = "none";
      fireball.style.display = "none";
      tornado.style.display = "none";
      clearInterval(skillTwo);
      clearInterval(skillThree);
      clearInterval(multiplierCounter);
      clearInterval(newBossDamage);
      document.getElementById("damage-visual").style.display = "none";
      $("#crystal").slideDown(1000);
      gameOverReplayPromptTimer();
      $("#god-mode").hide();
      clearInterval(updateStats);
      clearInterval(morePotionTimer);
      clearInterval(hideBossDamageTimer);

      //!Remove Char Attributes
      $("#damage-received").hide();
   }
}
/* 
===============================================================================
* Damage Counter
===============================================================================
*/
let multiplier = 0;
//? Hitbox at 1140px - 1600
//! Damange of Spells
let ice = 750;
let fire = 1500;
let poison = 2;
let wind = 3;
let sword = 1;

function damageMultiplier() {
   //? Multiplies the damage from 0 - 10
   multiplier = Math.floor(Math.random() * 10);
   console.log("Multiplier = x" + multiplier);
}

function damageMultiplierTimer() {
   //? Sets a new multiplier every second
   multiplierCounter = setInterval(damageMultiplier, 3000);
}

//! Damage Received
function alignDamageReceived() {
   document.getElementById("damage-received").style.left = parseInt(char.style.left) - 50 + "px";
}
/* 
===============================================================================
* Character Name Prompt
===============================================================================
*/
let charName = prompt(
   "In order save the village from this plague, you must find the last ingredient of Eve's Elixir. Defeat Lord Kronus and extract a piece of the moon amethyst. Who are you tiny mage?"
);
function getCharacterName() {
   document.getElementById("char-name").innerHTML = charName + " (Lvl. 99)";
}

/* 
===============================================================================
! Boss Skills
===============================================================================
*/
let skillTwoDamage = 1500;
let skillThreeDamage = 3000;
//! Generate a mew base damage for boss
function randomBossSkillDamage() {
   skillTwoDamage = Math.floor(Math.random() * 4000);
   skillThreeDamage = Math.floor(Math.random() * 6000);
}
function randomBossSkillDamageTimer() {
   newBossDamage = setInterval(randomBossSkillDamage, 3000);
}
function hideDamageReceived() {
   $("#damage-received").hide();
}

//! ---------------------------------- Skill Two ---------------------------------
function alignSkillTwo() {
   //? Align Skill to Boss
   document.getElementById("boss-skill-two").style.left = "650px";
}
function skillTwoLeft() {
   //? Move Skill to Left
   document.getElementById("boss-skill-two").style.visibility = "visible";
   document.getElementById("boss-skill-two").style.left =
      parseInt(document.getElementById("boss-skill-two").style.left) - 10 + "px";
}

function skillTwoLeftTimer() {
   //? Sets Timer to Move Left
   document.getElementById("kronus-sound-01").play();
   alignSkillTwo();
   twoMoveLeftTimer = setInterval(skillTwoLeft, 10);
   setTimeout(skillTwoOff, 750);
   charTotalHP = charTotalHP - skillTwoDamage;
   document.getElementById("char-hp").innerHTML = "HP: " + charTotalHP;
   gameOver();
   document.getElementById("damage-received").innerHTML = "-" + skillTwoDamage;
   $("#damage-received").show();
   setTimeout(hideDamageReceived, 1500);
   document.getElementById("char-hit").play();
}
function skillTwoOff() {
   //? Turn Off Moving Left function
   clearInterval(twoMoveLeftTimer);
   document.getElementById("boss-skill-two").style.visibility = "hidden";
}
function skillTwoInterval() {
   //! HOW OFTEN DOES THIS SKILL RUN?
   skillTwo = setInterval(skillTwoLeftTimer, 5000);
   setTimeout(hideDamageReceived, 1500);
}

//! ---------------------------------- Skill Three ----------------------------------
function skillThreeOn() {
   //? Activates the third skill
   document.getElementById("kronus-sound-02").play();
   document.getElementById("boss-skill-three").style.visibility = "visible";
   setTimeout(skillThreeOff, 2300);
   charTotalHP = charTotalHP - skillThreeDamage;
   document.getElementById("char-hp").innerHTML = "HP: " + charTotalHP;
   gameOver();
   document.getElementById("damage-received").innerHTML = "-" + skillThreeDamage;
   $("#damage-received").show();
   document.getElementById("char-hit").play();
}
function skillThreeOff() {
   //? Turns off the third skill
   document.getElementById("boss-skill-three").style.visibility = "hidden";
}

function skillThreeInterval() {
   //! HOW OFTEN DOES THIS SKILL RUN?
   skillThree = setInterval(skillThreeOn, 11000);
}
/* 
===============================================================================
? Potion and Counter
===============================================================================
*/
//! Health Potion
let healthPotion = 0; //! Will heal 1000pts of HP
let healthPotionCount = Math.floor(Math.random() * 20);
function addHPToChar() {
   if (charTotalHP > 0) {
      charTotalHP += healthPotion;
      document.getElementById("char-hp").innerHTML = "HP: " + charTotalHP;
   } else {
      charTotalHP += 0;
   }
}

function decreaseHealthPotion() {
   if (healthPotionCount > 0) {
      healthPotion = 2000;
      healthPotionCount--;
      document.getElementById("hp-pot-counter").innerHTML = healthPotionCount;
   } else if (healthPotionCount <= 0) {
      healthPotion = 0;
   }
}
let magicPotionCount = Math.floor(Math.random() * 25);
function upgradeBaseMagicDamage() {
   if (magicPotionCount > 0) {
      ice = ice + 500;
      fire = fire + 1000;
      poison = poison + 10;
      wind = wind + 15;
   } else {
      ice = ice + 0;
      fire = fire + 0;
      poison = poison + 0;
      wind = wind + 0;
   }
}
let strPotionCount = Math.floor(Math.random() * 25);
function upgradeBaseMeleeDamage() {
   if (strPotionCount > 0) {
      sword = sword + 5; //! Change the added base damage
   } else {
      sword = sword + 0;
   }
}

function decreaseStrPotionCount() {
   if (strPotionCount > 0) {
      strPotionCount--;
      document.getElementById("str-pot-counter").innerHTML = strPotionCount;
   } else {
      strPotionCount = strPotionCount;
      document.getElementById("str-pot-counter").innerHTML = strPotionCount;
   }
}

function decreaseMagicPotionCount() {
   if (magicPotionCount > 0) {
      magicPotionCount--;
      document.getElementById("magic-pot-counter").innerHTML = magicPotionCount;
   } else {
      magicPotionCount = magicPotionCount;
      document.getElementById("magic-pot-counter").innerHTML = magicPotionCount;
   }
}


/* 
===============================================================================
? Char Game Over
===============================================================================
*/
function gameOver() {
   if (charTotalHP < 0) {
      //!Toggle Game over Sound
      document.getElementById("bg-music").pause();
      document.getElementById("game-over").play();
      document.getElementById("char-hp").innerHTML = "Defeat";

      skillThreeOff();
      skillTwoOff();
      clearInterval(skillTwo);
      clearInterval(skillThree);
      spell.style.display = "none";
      curse.style.display = "none";
      fireball.style.display = "none";
      tornado.style.display = "none";
      clearInterval(multiplierCounter);
      document.getElementById("damage-visual").style.display = "none";
      $("#char").fadeOut(5000);
      document.getElementById("melee").style.display = "none";
      document.getElementById("boss-hp").style.display = "none";
      bossHP = 999999999;
      $("#you-lose").slideDown("slow");
      clearInterval(updateStats);
      clearInterval(morePotionTimer);
      clearInterval(hideBossDamageTimer);

      $("#damage-received").hide();
   }
}



function gameOverReplayPrompt() {
   if (parseInt(char.style.left) > 1150 && parseInt(char.style.left) < 1180) {
      $("#you-win").slideDown("slow");
   } else {
      $("#you-win").slideUp("slow");
   }
}
function gameOverReplayPromptTimer() {
   replayTimer = setInterval(gameOverReplayPrompt, 500);
}

/* 
===============================================================================
? Stats
===============================================================================
*/
function baseDamageStats() {
   document.getElementById("ice-stat").innerHTML = ice;
   document.getElementById("fire-stat").innerHTML = fire;
   document.getElementById("tornado-stat").innerHTML = wind * 80;
   document.getElementById("curse-stat").innerHTML = poison * 90;
   document.getElementById("sword-stat").innerHTML = sword * 100;

   //!Multiplier
   document.getElementById("multiplier").innerHTML = "x" + multiplier;
}

updateStats = setInterval(baseDamageStats, 1000);

/* 
===============================================================================
? Enter Limbo
===============================================================================
*/
function burnDamageInLimbo() {
   charTotalHP -= 500;
   document.getElementById("char-hp").innerHTML = "HP: " + charTotalHP;
   document.getElementById("damage-received").innerHTML = "-500";
   gameOver();
}
function burnDamageTimer() {
   burnDamageInLimboTimer = setInterval(burnDamageInLimbo, 750);
}

/* 
===============================================================================
! Add Potions
===============================================================================
*/
function addMorePotions() {
   bossHP = bossHP + 999999;
   document.getElementById("boss-hp").innerHTML = "HP: " + bossHP;
   strPotionCount = strPotionCount + Math.floor(Math.random() * 8); //! Str Potion Count
   magicPotionCount = magicPotionCount + Math.floor(Math.random() * 8); //! Magic Potion Count
   healthPotionCount = healthPotionCount + Math.floor(Math.random() * 5); //! Health Potion Count
   document.getElementById("hp-pot-counter").innerHTML = healthPotionCount;
   document.getElementById("str-pot-counter").innerHTML = strPotionCount;
   document.getElementById("magic-pot-counter").innerHTML = magicPotionCount;
}

morePotionTimer = setInterval(addMorePotions, 6000);

/* 
===============================================================================
? Mute Sound
===============================================================================
*/
let bgMusicPlaying = true;
function muteBgMusic() {
   if (bgMusicPlaying) {
      document.getElementById("bg-music").pause();
      document.getElementById("mute-bg-music").innerHTML = "Unmute BG Music";
      bgMusicPlaying = false;
   } else {
      document.getElementById("bg-music").play();
      document.getElementById("mute-bg-music").innerHTML = "Mute BG Music";

      bgMusicPlaying = true;
   }
}
