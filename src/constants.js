export default {
	NEW_PIECE: {
		name: "New Piece",
		notes: "No notes",
		cost: "1",
		active: true,
		stats: {
			"health": "7 / 10 / 13",
			"moveDelay": "1",
			"attackDelay": "1.5",

			"baseDMG": "1 / 2 / 3",
			"knockDMG": "0",

			"range": "1",
			"piercing": "No"
		},
		abilities: [],
		synergies: [],
		image:
			"data:image/jpeg;base64,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"
	},
	// STAT_RANGES: {
	//   health: {
	//     min: 400,
	//     max: 1000
	//   },
	//   armor: {
	//     min: 0,
	//     max: 10
	//   },
	//   resist: {
	//     min: 0,
	//     max: 25
	//   },
	//   damage: {
	//     min: 60,
	//     max: 110
	//   },
	//   attackSpeed: {
	//     min: 1.6,
	//     max: 0.8
	//   },
	//   range: {
	//     min: 1,
	//     max: 4
	//   }
	// },
	// STAT_ORDER: ["armor", "resist", "range", "attackSpeed", "damage", "health"],
	NEW_ABILITY: {
		name: "New ability",
		description: "Insert description here",
		image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAEAAQADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACB//EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOVlJtlFEAUQBiICFIEigChiARQoBEVACKBlFAIGgADQABoAAUABQNJEEUQBRAFEAihEoUoEVAChigBGIBEUDKKQAaAoDQABoAyiAAaANFEEkQSKERSUSKBIoBESDKaQMqNAAigZiKABoAyikGUQKA0AZRANpEEUREkVEigSKBIoAYiARUARQoGUYgAaAANAGUUDIaAAEIoDQBogiFIqIogkiCRQJFAkUIIoUARUBlNAUBoAAUDIaAAFAyGgDKIRWiCqEggUiCKIJFCJFKJFAEUARQAFAA0AZRCKA0AZDQBkNAACEGiCoSCBIIEgiIoqJIgCiARUAIgAigZRQMhoAyGgigEAAQABANEECQQJBAkFUKRBJEEigSKUAagABoIAFAyiAAIQAIFAIAAgCQ0CKwgSCISCoikBIIFIqiRQANAAGmRQGggyiAAIAMtBFZDQBkEaBaZaAkECRhVCQQJBAkFQkEQpEACAAI0ADoRQCNAAgACEUAjQDLQBNMkGiCBIIhIKhIQNFkqNFkiNKhAQkABAAEIo0aQABAAEIoGkaABZAkECQQJBBpAqhIIEskGkEo0gqIUKgQQFQIQQQBAgACyioIABpAIgg0WSDRZINFkqhIIFAgUCBVFQFBAkECSAIJAAQgAQKAQABAIskGiyQJBAkIGiyVQkICQgKoVA1CoCEAISBBBBBAVAgACAAIAEFAkFQlkg0WSBLJBpBKjSCAoICggKCBIJBBAUhAEEAQSAAhAEIVoslUaQIEskGkEDSCBpMkDUEBVCAoACggSCBBAEkAQQBAhFf//Z",
		// cooldown: 10
	},
	NEW_SYNERGY: {
		name: "New synergy",
		bonuses: []
	},
	NEW_BONUS: {
		text: "(0) New bonus"
	},
	COST_COLORS: {
		"0": "hsla(0, 0%, 25%, 0.6)",
		"1": "hsla(0, 0%, 75%, 0.5)",
		"2": "hsla(125, 100%, 70%, 0.4)",
		"3": "hsla(220, 100%, 55%, 0.6)",
		"4": "hsla(283, 100%, 60%, 0.65)",
		"5": "hsla(29, 100%, 60%, 0.8)"
	}
};
