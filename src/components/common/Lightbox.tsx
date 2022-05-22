import React, {useRef, useState} from "react";
import { Button, Navbar, Spinner } from "react-bootstrap";
import { ArrowClockwise, ArrowCounterclockwise, ArrowRepeat, Fullscreen, FullscreenExit, ZoomIn, ZoomOut } from "react-bootstrap-icons";

const DEFAULT_ZOOM_STEP  = 0.3;
const DEFAULT_LARGE_ZOOM = 4;

type LightboxProps = {
    image: string,
    zoomStep?: number,
    doubleClickZoom?: number,
}

type StyleButtonProps = {
    children?: any,
    [rest: string]: any
}

type CanvasProps = {
    loading: boolean,
    children?: any,
    [rest: string]: any
}

function StyledButton(props: StyleButtonProps) : JSX.Element {
    return (
        <Button variant="outline-secondary" style={{border: "none"}} {...props}>
            {props.children}
        </Button>
    )
}

function Canvas(props: CanvasProps) : JSX.Element {
    return (
        <div className="overflow-hidden flex-fill d-flex justify-content-center align-items-center" {...props}>
            {props.loading ? <Spinner animation="border" variant="light"/> : null}
            {props.children}
        </div>
    )
}

export default function Lightbox(props: LightboxProps) : JSX.Element {
    let {
        image,
        zoomStep = DEFAULT_ZOOM_STEP,
        doubleClickZoom = DEFAULT_LARGE_ZOOM,
    } = props
    let [xy0, setXY0] = useState({x0: 0,y0: 0})
    let [xy1, setXY1] = useState({x1: 0,y1: 0})
    let [xy, setXY] = useState({x:0, y:0})
    let _canvas = useRef<HTMLDivElement>(null)
    let [zoom, setZoom] = useState(1)
    let [rotate, setRotate] = useState(0)
    let [loading, setLoading] = useState(true)
    let [dragLock, setDragLock] = useState(true)
    let [maximised, setMaximised] = useState(false)

    const createTransform = (x: number, y: number, zoom: number, rotate: number) => 
        `translate3d(${x}px,${y}px,0px) scale(${zoom}) rotate(${rotate}deg)`;
    function shockZoom(e: MouseEvent | React.MouseEvent<HTMLImageElement, MouseEvent>){
        if(!doubleClickZoom) return false;
        if(zoom > 1) return resetZoom();
        const _z   = ((zoomStep<1)?Math.ceil(doubleClickZoom / zoomStep):zoomStep) * zoomStep;
        const canvas = _canvas.current?.getBoundingClientRect?.() ?? {x:0, y:0, height:0, width:0} ;
        let _ccx = canvas.x + (canvas.width / 2)
        let _ccy = canvas.y + (canvas.height / 2)
        setXY({
            x:(e.pageX - _ccx) * -1 * _z,
            y:(e.pageY - _ccy) * -1 * _z
        })
        setZoom(_z)
    }
    function wheelZoom(e: WheelEvent | React.WheelEvent<HTMLImageElement>){
        if (e.deltaY < 0) setZoom(zoom + zoomStep)
        else setZoom(zoom - zoomStep)
    }
    function startMove(e: MouseEvent | React.MouseEvent<HTMLImageElement, MouseEvent>){
        setDragLock(false)
        const canvas = _canvas.current?.getBoundingClientRect?.() ?? {x:0, y:0, height:0, width:0} 
        setXY0({
            x0  : (e.pageX - canvas.x) - xy1.x1,
            y0  : (e.pageY - canvas.y) - xy1.y1
        })
    }
    function duringMove(e: MouseEvent | React.MouseEvent<HTMLImageElement, MouseEvent>){
        if (dragLock) return false
        const _cbr = _canvas.current?.getBoundingClientRect?.() ?? {x:0, y:0, height:0, width:0}
        setXY1({
            x1 : (e.pageX - _cbr.x) - xy0.x0,
            y1 : (e.pageY - _cbr.y) - xy0.y0 
        })
        setXY({
            x: xy1.x1,
            y: xy1.y1,
        })
    }
    function resetZoom() {
        setXY({x:0, y:0})
        setZoom(1)
    }
    function reset() {
        resetZoom()
        setRotate(0)
    }
    let canReset = (!!xy.x || !!xy.y || zoom !== 1 || rotate !== 0)

    if(!image) console.warn("Not showing lightbox because no image was supplied")
    return (
        <div className={`bg-dark w-100 h-100 p-0 d-flex justify-content-center align-items-stretch position-${maximised ? "absolute" : "relative"}`}
            style={ maximised ? {top: "0", left: "0", zIndex: "5000"} : {}}>
            <Canvas loading={loading}
                onWheel={(e: React.WheelEvent<HTMLImageElement> | WheelEvent)=>wheelZoom(e)}
                >
                <img draggable = "false" src={image} alt='Lightbox'
                style={{
                    transform: createTransform(xy.x,xy.y,zoom,rotate),
                    cursor: "grab",
                    visibility: loading?"hidden":undefined,
                    maxHeight: "90%",
                    maxWidth:"90%"
                }}
                onMouseDown={e=>startMove(e)}
                onMouseMove={e=>duringMove(e)}
                onMouseUp={()=>setDragLock(true)}
                onMouseLeave={()=>setDragLock(true)}
                onDoubleClick={e=>shockZoom(e)}
                onLoad={()=>setLoading(false)}
                />
            </Canvas>
            <Navbar className="bg-transparent gap-2 position-absolute start-50 translate-middle-x" style={{top:'85%'}}>
                <StyledButton onClick={reset} disabled={!canReset}><ArrowRepeat fill="white" style={{width:"1.5em", height: "1.5em"}}/></StyledButton>
                <StyledButton onClick={()=>setZoom(zoom + zoomStep)} ><ZoomIn fill="white" style={{width:"1.5em", height: "1.5em"}}/></StyledButton>
                <StyledButton onClick={()=>setZoom(zoom - zoomStep)}><ZoomOut fill="white" style={{width:"1.5em", height: "1.5em"}}/></StyledButton>
                <StyledButton onClick={()=>setRotate(rotate - 90)} ><ArrowCounterclockwise fill="white" style={{width:"1.5em", height: "1.5em"}}/></StyledButton>
                <StyledButton onClick={()=>setRotate(rotate + 90)} ><ArrowClockwise fill="white" style={{width:"1.5em", height: "1.5em"}}/></StyledButton>
                {maximised ? 
                    <StyledButton onClick={()=>setMaximised(false)} ><FullscreenExit fill="white" style={{width:"1.5em", height: "1.5em"}}/></StyledButton> :
                    <StyledButton onClick={()=>setMaximised(true)}><Fullscreen fill="white" style={{width:"1.5em", height: "1.5em"}}/></StyledButton>
                }
            </Navbar>
        </div>
        )
}