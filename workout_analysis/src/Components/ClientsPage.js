import React,{useState} from "react"
import MenuCard from "./MenuCard"

const ClientsPage=({clients})=>{
	const [selectedClient,setSelectedClient]=useState(null)

	{if(!clients){return (<div>No clients</div>)}}
	return(
		<div className="pageContainer"> 
			<MenuCard header={"My Clients"} body={ 
				()=>
					<div style={{display:"flex"}}>
						{clients.map((client,i)=>( 
							<div onClick={()=>{setSelectedClient(client)}}
								key={i} 
								style={{
									margin:"10px",
									boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.45)", borderRadius: "5px",
									cursor:"pointer",display:"flex",flexDirection:"column", alignItems:"center",
									height:"200px", width:"155px", }}>
								<h5>
									{client.username }
								</h5>
							</div>
						)) }
					</div>
			}/> 
			{selectedClient &&
			<div style={{display:"flex",flexDirection:"column",}} className="resultPage clientView" >
				<div className="client__header" style={{borderBottom:"0.5px solid #CECECE",padding:"40px",display:"flex",}} > 
					<div className="client__details" style={{marginRight:"25px",display:"flex",flexDirection:"column"}}>
						<h5 style={{display:"inline"}}> Username </h5>
						<p style={{display:"inline"}}> {selectedClient.username}</p>
					</div>
					<div className="client__details" style={{display:"flex",flexDirection:"column"}}>
						<h5 style={{display:"inline"}}> Email </h5>
						<p style={{display:"inline"}}> example@example.com</p>
					</div>
				</div>
				<div className="client__regiment" style={{borderBottom:"0.5px solid #CECECE",padding:"40px",display:"flex",}} > 
					{ Object.entries(selectedClient.currentRegiment)
						.map((day)=>
						{
							const value=day[1]||""
							return (
								<div key={day[0]} style={{display:"flex",flexDirection:"column",margin:"5px"}}>
									<h5> {day[0]} </h5> 
									<input value={value} type="checkbox" disabled="disabled"readOnly={true} checked={value} />
								</div>)}) 
					}
				</div>
				<div> {/* component class so each has "collapsed" state */}
				</div>

			</div> 
			}
		</div> 
	)
}
export default ClientsPage