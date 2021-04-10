import React from "react"

const CheckBox = ({callback,value}) =>
/*custom checkbox component */
{
	return ( 
		<div className="checkContainer" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
			<label className="checkbox">
				<span className="checkbox__input">
					<input type="checkbox" name="checkbox" readOnly={true} value={value} checked={value} />
					<span className="checkbox__control" onClick={()=>{callback()}}>
						<svg className="checkbox__svg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
							<path fill='none' stroke='currentColor' strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
						</svg>
					</span>
				</span>
			</label>
		</div>
	)
}


export default CheckBox