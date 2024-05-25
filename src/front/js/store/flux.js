const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			diseases: [],
			diseasesToEdit:{},
            editing:  false,
			singleDiseases: {},
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
// CREAR FECTH PARA GET DISEASES
			getDiseases: () => {
                fetch(process.env.BACKEND_URL + "/api/diseases")
                    .then((response) => response.json())
                    .then((data) => setStore({ diseases: data }));
            },

			getSingleDiseases: (diseasesID) => {
				fetch(process.env.BACKEND_URL + `/api/diseases/${diseasesID}`)
				.then( (response) => response.json())
				.then( data => setStore({ singleDiseases: data }))
			},

			createDisease: (kind, sintoms) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        "kind": kind,
                        "sintoms": sintoms 
                    })
                };
				fetch(process.env.BACKEND_URL + "/api/diseases", requestOptions)
				.then(response => response.json())
				.then(() => getActions().getDiseases());
		},
		deleteDisease: (idToDelete) => {
			fetch(`${process.env.BACKEND_URL}/api/diseases/${idToDelete}`, { method: 'DELETE' })
				.then(() => getActions().getDiseases());
		},
		updateDiseaseAPI: (kind, sintoms, diseaseID) => {
			const requestOptions = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ 
					"kind": kind,
					"symptoms": sintoms 
				})
			};
			fetch(`${process.env.BACKEND_URL}/api/diseases/${diseaseID}`, requestOptions)
				.then(response => response.json())
				.then(() => {
					setStore({ diseaseToEdit: {} });
					setStore({editing:false})
					getActions().getDiseases();
				});
		},

		updateDiseases: (diseaseID) => {
			const diseaseSelected = getStore().diseases.find(element => element.id === diseaseID)
			setStore({ singleDiseases: diseaseSelected })
			
		},

		

		setEditing: (value) => {
			setStore({ editing: value });
		},
		
		deleteSingleDisease: () => {
			setStore({ singleDisease: {} });
		  },



		changeColor: (index, color) => {
			//get the store
			const store = getStore();

			//we have to loop the entire demo array to look for the respective index
			//and change its color
			const demo = store.demo.map((elm, i) => {
				if (i === index) elm.background = color;
				return elm;
			});

			//reset the global store
			setStore({ demo: demo });
		},
		loadData: ()=>{
			getActions().getDiseases()
		}
	}
};
};

export default getState;
