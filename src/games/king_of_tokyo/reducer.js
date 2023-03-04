const reducer = (state, action) => {
	const {
		players,
		currentPlayerIndex,
		tokyoCityOccupied,
		tokyoBayOccupied,
		dice,
		tokyoCityYielded,
		diceResults,
		tokyoBayPlayer,
		tokyoOccupied,
		indexOfEliminateds,
		playersReloaded,
	} = state;

	if (action.type === 'CHECK_ELIMINATED') {
		let eliminatedPlayers = players.filter(player => player.health <= 0);
		if (eliminatedPlayers.length > 0) {
			let newPlayers;
			let bothTokyoPlayersEliminated = false;
			if (eliminatedPlayers.length > 1) {
				if (eliminatedPlayers[0].inTokyoCity && eliminatedPlayers[1].inTokyoBay ||
					eliminatedPlayers[1].inTokyoCity && eliminatedPlayers[0].inTokyoBay) {
					bothTokyoPlayersEliminated = true;
				}
			}
			eliminatedPlayers.forEach(eliminatedPlayer => {
				newPlayers = players.map((player, i) => {
					if ((eliminatedPlayer.inTokyo || bothTokyoPlayersEliminated) && i === currentPlayerIndex ) {
						return {...player, inTokyo: true};
					}
					if (eliminatedPlayer.inTokyoCity) {
						if (tokyoBayOccupied) {
							if (player.inTokyoBay) {
								return {...player, inTokyoCity: true, inTokyoBay: false};
							}
							if (i === currentPlayerIndex) {
								return {...player, inTokyoBay: true};
							}
							return player;
						}
						if (!tokyoBayOccupied && i === currentPlayerIndex) {
							return {...player, inTokyoCity: true};
						}
					}
					if (eliminatedPlayer.inTokyoBay && i === currentPlayerIndex) {
						return {...player, inTokyoBay: true};
					}
					return player;
				})
			});
			newPlayers = newPlayers.filter(player => player.health > 0);
			let extraRules = true;
			let isBayOccupied = tokyoBayOccupied;
			let isTokyoOccupied = tokyoOccupied;
			let isCityOccupied = tokyoCityOccupied;
			if (newPlayers.length < 5) {
				isBayOccupied = false;
				extraRules = false;
				isTokyoOccupied = true;
				isCityOccupied = false;
				newPlayers = newPlayers.map(player => {
					if (player.inTokyoBay) {
						return {...player, inTokyoBay: false};
					}
					if (player.inTokyoCity) {
						return {...player, inTokyoCity: false, inTokyo: true};
					}
					return player;
				})
			}
			let message = eliminatedPlayers[0].name + ' has been eliminated!';
			if (eliminatedPlayers.length === 2) {
				message = eliminatedPlayers[0].name + ' and ' + eliminatedPlayers[1].name + ' have been eliminated!';
			}
			if (eliminatedPlayers.length === 3) {
				message = eliminatedPlayers[0].name + ', ' + eliminatedPlayers[1].name + ' and ' + eliminatedPlayers[2].name + ' have been eliminated!';
			}
			if (eliminatedPlayers.length === 4) {
				message = eliminatedPlayers[0].name + ', ' + eliminatedPlayers[1].name + ', ' + eliminatedPlayers[2].name + ' and ' + eliminatedPlayers[3].name + ' have been eliminated!';
			}
			if (eliminatedPlayers.length === 5) {
				message = eliminatedPlayers[0].name + ', ' + eliminatedPlayers[1].name + ', ' + eliminatedPlayers[2].name + ', ' + eliminatedPlayers[3].name + ' and ' + eliminatedPlayers[4].name + ' have been eliminated!';
			}
			let indexOfEliminateds = [];
			eliminatedPlayers.forEach(eliminatedPlayer => {
				indexOfEliminateds.push(players.indexOf(eliminatedPlayer));
			})
			return {
				...state, 
				players: newPlayers, 
				indexOfEliminateds: indexOfEliminateds,
				showModal: true,
				modalMessage: message,
				extraRules: extraRules,
				tokyoBayOccupied: isBayOccupied,
				tokyoCityOccupied: isCityOccupied,
				tokyoOccupied: isTokyoOccupied,
			}
		}
		return state;
	}

	if (action.type === 'CLOSE_MODAL') {
		return {...state, showModal: false, gameOver: false};
	}

	if (action.type === 'DESELECT_DICE') {
		const deselectedDice = dice.map(die => {
			return {...die, selected: false};
		})
		return {
			...state,
			dice: deselectedDice,
		}
	}

	if (action.type === 'HANDLE_YIELD_TOKYO_CITY') { // --------------------------------------------------------------------
		// GET THE PLAYER INDEX THAT JUST ATTACKED
		let prevPlayerIndex = currentPlayerIndex -1;
		if (currentPlayerIndex === 0) {
			prevPlayerIndex = players.length -1;
		}
		let newPlayers = players;
		let tokyoCityOccupied = true;
		let tokyoBayOccupied = false;
		// if no one in tokyo bay
		if (!state.tokyoBayOccupied) {
			newPlayers = players.map((player, i) => {
				if (player.inTokyoCity) {
					if (player.id -1 === currentPlayerIndex) {
						return {
							...player, 
							inTokyoCity: false,
							points: player.points -2
						}
					}
					return {...player, inTokyoCity: false, inTokyoBay: false}
				}
				if (i === prevPlayerIndex) {
					return {...player, points: player.points + 1, inTokyoCity: true, inTokyoBay: false};
				}
			})
		}
		// if someone in tokyo bay
		if (state.tokyoBayOccupied) {
			tokyoBayOccupied = true;
			newPlayers = players.map((player, i) => {
				if (player.inTokyoCity) {
					if (player.id -1 === currentPlayerIndex) {
						return {
							...player, 
							inTokyoCity: false,
							points: player.points -2
						}
					}
					return {...player, inTokyoCity: false}
				}
				if (player.inTokyoBay) {
					if (i === prevPlayerIndex) {
						tokyoBayOccupied = false;
					}
					return {
						...player,
						inTokyoBay: false,
						inTokyoCity: true,
					}
				}
				if (i === prevPlayerIndex) {
					return {
						...player, 
						points: player.points + 1, 
						inTokyoBay: true
					};
				}
				return player;
			})
		}
		return {
			...state,
			players: newPlayers,
			tokyoCityYielded: true,
			tokyoCityOccupied: tokyoCityOccupied,
			tokyoBayOccupied: tokyoBayOccupied,
		}
	}
	if (action.type === 'HANDLE_YIELD_TOKYO_BAY') {
		// GET THE PLAYER THAT JUST ATTACKED
		let prevPlayerIndex = currentPlayerIndex -1;
		if (currentPlayerIndex === 0) {
			prevPlayerIndex = players.length -1;
		}
		let newPlayers = players;
		let tokyoBayOccupied = true;
		if (tokyoCityYielded) {
			tokyoBayOccupied = false;
			newPlayers = players.map((player, i) => {
				if (player.inTokyoCity) {
					if (i === currentPlayerIndex) {
						return {
							...player, 
							inTokyoCity: false,
							points: player.points -2
						}
					}
					return {...player, inTokyoCity: false}
				}
				if (i === prevPlayerIndex) {
					return {...player, points: player.points + 1, inTokyoCity: true};
				}
				return player;
			})
		} else {
			// take player out of tokyo bay and put new player in tokyo bay
			newPlayers = players.map((player, i) => {
				if (player.inTokyoBay) {
					if (i === currentPlayerIndex) {
						return {
							...player, 
							inTokyoBay: false,
							points: player.points -2
						}
					}
					return {...player, inTokyoBay: false}
				}
				if (i === prevPlayerIndex) {
					return {...player, points: player.points + 1, inTokyoBay: true};
				}
				return player;
			})
		}


		return {...state, players: newPlayers, tokyoBayOccupied: tokyoBayOccupied}
	}

	if (action.type === 'HANDLE_YIELD') {
		// GET THE PLAYER THAT JUST ATTACKED
		let prevPlayerIndex = currentPlayerIndex -1;
		if (currentPlayerIndex === 0) {
			prevPlayerIndex = players.length -1;
		}

		const newPlayers = players.map((player, i) => {
			if (player.inTokyo) {
				if (i === currentPlayerIndex) {
					return {
						...player, 
						inTokyo: false,
						points: player.points -2
					}
				}
				return {...player, inTokyo: false};
			}
			if (i === prevPlayerIndex) {
				return {...player, points: player.points +1, inTokyo: true}
			}
			return player;
		})
		return {...state, showYieldModal: false, players: newPlayers};
	}

	if (action.type === 'HIDE_YIELD_MODAL') {
		return {...state, showYieldModal: false};
	}
	if (action.type === 'HIDE_YIELD_TOKYO_CITY_MODAL') {
		return {...state, showYieldTokyoCityModal: false};
	}
	if (action.type === 'HIDE_YIELD_TOKYO_BAY_MODAL') {
		return {...state, showYieldTokyoBayModal: false};
	}

	if (action.type === 'PLAY_AGAIN') {
		let extraRules = false;
		if (playersReloaded.length >= 5) extraRules = true;
		return {
			...state, 
			players: playersReloaded, 
			tokyoOccupied: false, 	
			tokyoCityOccupied: false,
			tokyoBayOccupied: false,
			indexOfEliminateds: [],
			extraRules: extraRules,
		}
	}

	if (action.type === 'REDUCE_ROLLS_LEFT') {
		const rollsLeft = state.numRolls - 1;
		return {
			...state,
			numRolls: rollsLeft,
		}
	}

	if (action.type === 'RESET_NUM_ROLLS') {
		return {...state, numRolls: 3}
	}

	if (action.type === 'ROLL_DICE') {
		const newDice = dice.map(die => {
			let newValue = Math.floor(Math.random() * 5) + 1;
			if (!die.selected) {
				return {...die, value: newValue};
			}
			return die;
		});
		return {
			...state,
			dice: newDice,
		}
	}

	if (action.type === 'SELECT_DIE') {
		const selected_die = dice.map(die => {
			if (die.id === action.payload) {
				return {...die, selected: !die.selected};
			}
			return die;
		})
		
		return {...state, dice: selected_die}
	}

	if (action.type === 'SET_DICE_RESULTS') {
		let ones = 0;
		let twos = 0;
		let threes = 0;
		let points = 0;
		const {damageDealt, healthGained} = dice.reduce((total, die) => {
			if (die.value === 1) ones += 1;
			if (die.value === 2) twos += 1;
			if (die.value === 3) threes += 1;
			if (die.value === 4) total.healthGained += 1;
			if (die.value === 5) total.damageDealt += 1;
	
			return total;
		}, {
			damageDealt: 0,
			healthGained: 0,
		})
		if (ones >= 3) points += ones -2;
		if (twos >= 3) points += twos -1;
		if (threes >= 3) points += threes;

		return {
			...state,
			dice: dice.map(die => {return {...die, selected: false}}),
			diceResults: {
				...state.diceResults, 
				points: points, 
				damageDealt: damageDealt, 
				healthGained: healthGained
			},
		};
	}

	if (action.type === 'SET_EXTRA_RULES') {
		return {...state, extraRules: action.payload};
	}

	if (action.type === 'SET_INITIAL_PLAYERS') {
		return {...state, players: action.payload, playersReloaded: action.payload}
	}

	if (action.type === 'SET_NEXT_PLAYER') {
		indexOfEliminateds.sort((a, b) => a - b);
		let nextPlayerIndex = ((currentPlayerIndex + 1) - indexOfEliminateds.filter(index => index < currentPlayerIndex).length + players.length) % players.length;
		
		const newPlayers = players.map((player, i) => {
			if ((player.inTokyoCity || player.inTokyoBay || player.inTokyo) && nextPlayerIndex === i) {
				return {...player, points: player.points + 2}
			}
			return player;
		})
		return {...state, currentPlayerIndex: nextPlayerIndex, indexOfEliminateds: [], players: newPlayers}
	}

	if (action.type === 'SET_PLAYER_IN_TOKYO_NAME') {
		const playerInTokyo = players.find(player => player.inTokyo);
		const playerInTokyoCity = players.find(player => player.inTokyoCity);
		const playerInTokyoBay = players.find(player => player.inTokyoBay);
		if (playerInTokyo) {
			const name = playerInTokyo.name;
			return {...state, playerInTokyoName: name}
		}
		if (playerInTokyoCity) {
			if (playerInTokyoBay) {
				return {
					...state, 
					tokyoCityPlayer: playerInTokyoCity, 
					tokyoBayPlayer: playerInTokyoBay
				}
			}
			return {...state, tokyoCityPlayer: playerInTokyoCity}
		}
		return state;
	}

	if (action.type === 'SET_TOKYO_CITY_YIELDED') {
		return {...state, tokyoCityYielded: false}
	}

	if (action.type === 'SHOW_GAME') {
		return {...state, showGame: true}
	}

	if (action.type === 'SHOW_MODAL') {
		return {
			...state,
			showModal: true,
			modalMessage: action.payload.message,
			currentPlayerIndex: action.payload.index,
			gameOver: action.payload.gameOver
		}
	}

	if (action.type === 'SHOW_YIELD_MODAL') {
		return {...state, showYieldModal: true};
	}

	if (action.type === 'UPDATE_PLAYERS__EXTRA_RULES') {
		let currentPlayer = action.payload;
		// 1. NO ONE IS IN TOKYO
		if (!tokyoCityOccupied && !tokyoBayOccupied) {
			let newPlayers = players;
			let intoTokyoCity = false;
			if (diceResults.damageDealt > 0) {
				newPlayers = players.map((player) => {
					if (player === currentPlayer) {
						currentPlayer = {
							...player,
							points: player.points + diceResults.points + 1,
							health: player.health + diceResults.healthGained,
							inTokyoCity: true,
						};
						return currentPlayer
					}
					return player;
				})
				intoTokyoCity = true;
			} else {
				newPlayers = players.map((player) => {
					if (player === currentPlayer) {
						currentPlayer = {
							...player,
							points: player.points + diceResults.points,
							health: player.health + diceResults.healthGained,
						};
						return currentPlayer;
					}
					return player;
				})
			}
			return {
				...state,
				players: newPlayers,
				tokyoCityOccupied: intoTokyoCity,
			}
		}
		// 2. CURRENT PLAYER IN TOKYO CITY, NO-ONE IN TOKYO BAY
		if (currentPlayer.inTokyoCity && !tokyoBayOccupied) {
			const updatedPlayers = players.map((player) => {
				if (player === currentPlayer) {
					return {...player, points: player.points + diceResults.points};
				}
				return {
					...player,
					health: player.health - diceResults.damageDealt
				};
			})
			return {
				...state,
				players: updatedPlayers,
			}
		}
		// 3. CURRENT PLAYER IN TOKYO CITY, ONE PLAYER IN TOKYO BAY
		if (currentPlayer.inTokyoCity && tokyoBayOccupied) {
			const updatedPlayers = players.map((player) => {
				if (player === currentPlayer) {
					return {...player, points: player.points + diceResults.points};
				}
				if (player === tokyoBayPlayer) {
					return player;
				}
				return {
					...player,
					health: player.health - diceResults.damageDealt
				};
			})
			return {
				...state,
				players: updatedPlayers,
			}
		}
		// 4. CURRENT PLAYER IN TOKYO BAY
		if (currentPlayer.inTokyoBay) {
			const updatedPlayers = players.map((player, i) => {
				if (player === currentPlayer) {
					return {...player, points: player.points + diceResults.points};
				}
				if (player.inTokyoCity) {
					return player;
				}
				return {
					...player,
					health: player.health - diceResults.damageDealt
				};
			})
			return {
				...state,
				players: updatedPlayers,
			}
		}
		// 5. CURRENT PLAYER NOT IN TOKYO, ONE PLAYER IN TOKYO CITY, NO-ONE IN TOKYO BAY ----------------------------------------------------
		if (!currentPlayer.inTokyoBay && !currentPlayer.inTokyoCity && tokyoCityOccupied && !tokyoBayOccupied) {
			let intoTokyoBay = false;
			let intoTokyoCity = false;
			const tokyoCityPlayer = players.find(player => player.inTokyoCity);
			
			// UPDATE HEALTH
			let newHealth = currentPlayer.health + diceResults.healthGained;
			if (newHealth > 10) newHealth = 10;

			let updatedCurrentPlayer = {
				...currentPlayer, 
				points: currentPlayer.points + diceResults.points,
				health: newHealth,
			};
			if (diceResults.damageDealt > 0) {
				if (tokyoCityPlayer.health - diceResults.damageDealt <= 0) {
					intoTokyoCity = true;
				} else {
					intoTokyoBay = true;
				}
				// UPDATE PLAYER
				updatedCurrentPlayer = {
					...updatedCurrentPlayer, 
					points: updatedCurrentPlayer.points + 1,
					inTokyoBay: intoTokyoBay,
					inTokyoCity: intoTokyoCity,
				};
			}

			// YIELD QUESTION
			let showYieldTokyoCityModal = false;
			if (diceResults.damageDealt > 0) {
				if (tokyoCityPlayer.health - diceResults.damageDealt > 0) {
					showYieldTokyoCityModal = true;	
				}
			}
			
			// UPDATE PLAYERS
			const updatedPlayers = players.map((player) => {
				if (player === currentPlayer) return updatedCurrentPlayer;
				if (player.inTokyoCity) {
					return {
						...player, 
						health: player.health - diceResults.damageDealt
					};
				}
				return player;
			})
			
			return {
				...state, 
				players: updatedPlayers,
				tokyoBayOccupied: intoTokyoBay,
				tokyoCityPlayer: tokyoCityPlayer,
				tokyoBayPlayer: updatedCurrentPlayer,
				showYieldTokyoCityModal: showYieldTokyoCityModal,
			}
		}
		// 6. CURRENT PLAYER NOT IN TOKYO, ONE PLAYER IN TOKYO CITY, ONE PLAYER IN TOKYO BAY
		if (!action.payload.inTokyoCity 
			&& !action.payload.inTokyoBay 
			&& tokyoCityOccupied 
			&& tokyoBayOccupied) 
		{
			const currentPlayer = action.payload;
			const {
				players, 
				diceResults,
			} = state;
			let showYieldTokyoCityModal = false;
			let showYieldTokyoBayModal = false;
			let showYieldModal = false;
			
			// UPDATE HEALTH
			let newHealth = currentPlayer.health + diceResults.healthGained;
			if (newHealth > 10) newHealth = 10;

			// UPDATE PLAYER
			let updatedCurrentPlayer = {
				...currentPlayer, 
				points: currentPlayer.points + diceResults.points,
				health: newHealth,
			};

			// YIELD QUESTION
			if (diceResults.damageDealt > 0) {
				const tokyoCityPlayer = players.find(player => player.inTokyoCity);
				const tokyoBayPlayer = players.find(player => player.inTokyoBay);
				if (tokyoCityPlayer.health - diceResults.damageDealt > 0) {
					showYieldTokyoCityModal = true;
					if (tokyoBayPlayer.health - diceResults.damageDealt > 0) {
						showYieldTokyoBayModal = true;
					}
				} 
				if (players.length === 6) {
					if (tokyoBayPlayer.health - diceResults.damageDealt > 0) {
						showYieldTokyoCityModal = true;
					}
				} 
				if (players.length === 5) {
					if (tokyoCityPlayer.health - diceResults.damageDealt <= 0) {
						if (tokyoBayPlayer.health - diceResults.damageDealt > 0) {
							showYieldModal = true;
						}
					}
				}
			}
			
			// UPDATE PLAYERS
			const updatedPlayers = players.map((player) => {
				if (player === currentPlayer) return updatedCurrentPlayer;
				if (player.inTokyoCity || player.inTokyoBay) {
					return {
						...player,
						health: player.health - diceResults.damageDealt,
					};
				}
				return player;
			})
			
			return {
				...state, 
				players: updatedPlayers,
				showYieldTokyoCityModal: showYieldTokyoCityModal,
				showYieldTokyoBayModal: showYieldTokyoBayModal,
				showYieldModal: showYieldModal,
			}
		} 
	}

	if (action.type === 'UPDATE_PLAYERS__CURRENT_PLAYER_IN_TOKYO') {
		const updatedPlayers = players.map((player, i) => {
			if (i === currentPlayerIndex) {
				return {...player, points: player.points + diceResults.points};
			}
			return {
				...player,
				health: player.health - diceResults.damageDealt
			};
		})
		return {
			...state, 
			players: updatedPlayers,
		}
	}

	if (action.type === 'UPDATE_PLAYERS__CURRENT_PLAYER_OUT_TOKYO') {
		const currentPlayer = players.find((player, i) => i === currentPlayerIndex);
		
		// UPDATE HEALTH
		let newHealth = currentPlayer.health + diceResults.healthGained;
		if (newHealth > 10) newHealth = 10;

		// UPDATE PLAYER
		let updatedCurrentPlayer = {
			...currentPlayer, 
			points: currentPlayer.points + diceResults.points,
			health: newHealth,
		};

		// YIELD QUESTION
		let setShowYieldModal = false;
		if (tokyoOccupied && diceResults.damageDealt > 0) {
			const tokyoPlayer = players.find(player => player.inTokyo);
			if (tokyoPlayer.health - diceResults.damageDealt > 0) {
				setShowYieldModal = true;
			}
		}

		// PUT PLAYER INTO TOKYO
		let isTokyoOccupied = tokyoOccupied;
		if (!tokyoOccupied && diceResults.damageDealt > 0) {
			isTokyoOccupied = true;
			updatedCurrentPlayer = {
				...currentPlayer, 
				inTokyo: true, 
				points: updatedCurrentPlayer.points +1,
				health: updatedCurrentPlayer.health,
			};
		}
		
		// UPDATE PLAYERS
		const updatedPlayers = players.map((player, i) => {
			if (i === currentPlayerIndex) return updatedCurrentPlayer;
			if (player.inTokyo) {
				return {
					...player, 
					health: player.health - diceResults.damageDealt
				};
			}

			return player;
		})
		
		return {
			...state, 
			players: updatedPlayers, 
			tokyoOccupied: isTokyoOccupied,
			showYieldModal: setShowYieldModal,
		}
	}
}

export default reducer;