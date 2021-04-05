import React,{useEffect,useRef} from "react" 

const ProfilePicture =({ color,size,radius,font, initials}) => {
	const canvasRef = useRef(null)
  
	const draw = (ctx) => {
		ctx.clearRect(0, 0,  ctx.canvas.height,ctx.canvas.width,)
		ctx.fillStyle = "#000000"
		ctx.font=font
		ctx.textAlign = "center"
		ctx.textBaseline = "middle"
		ctx.beginPath()
		ctx.fillStyle=color
		ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, radius, 0, 2*Math.PI)
		ctx.fill()

		ctx.beginPath()
		ctx.fillStyle="white"
		ctx.fillText(initials, ctx.canvas.width/2, ctx.canvas.height/2) 
	}
  
	useEffect(() => { 
		const canvas = canvasRef.current
		const context = canvas.getContext("2d") 
		context.canvas.width=size // outter div dimensions. Can't figure out how to do it programatically 
		context.canvas.height=size
		draw(context) 
	})


	return <canvas  ref={canvasRef} />

}
export default ProfilePicture