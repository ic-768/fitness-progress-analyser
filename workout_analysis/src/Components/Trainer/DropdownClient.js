import React from "react"
import Dropdown from "react-bootstrap/Dropdown"

const DropdownClient = ({clients, selectedClient,setSelectedClient}) => { 
	/*Dropdown list to select from trainer's clients */
	return (
		<Dropdown style={{marginBottom:"20px"}}>
			<Dropdown.Toggle>
				{selectedClient && selectedClient.name || "Select a client"} 
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{clients && clients.map((client)=>( 
					<Dropdown.Item key={client.name} onClick={()=>{setSelectedClient(client)
					}}> {client.name}</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown> 

	)
}

export default DropdownClient