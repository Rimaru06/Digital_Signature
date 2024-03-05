import React, { useRef} from "react";
import SignaturePad from "signature_pad";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let signaturePad : SignaturePad;

  const clearSignature = () => {
    signaturePad.clear();
  };

  const saveSignature = () => {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const signatureData = signaturePad.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.download = "signature.jpg";
      link.href = signatureData;
      link.click();
      
    }
  };
  const saveSignaturePNG = () => {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const signatureData = signaturePad.toDataURL();
      const link = document.createElement("a");
      link.download = "signature.png";
      link.href = signatureData;
      link.click();
    }
  };
  const saveSignatureSVG = () => {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      const signatureData = signaturePad.toSVG();;
      const link = document.createElement("a");
      link.download = "signature.svg";
      link.href = signatureData;
      link.click();
    }
  };
  const undoSignature = () => {
    const data =  signaturePad.toData();
    if (data)
    {
      data.pop();
      signaturePad.fromData(data);
    }

  }
  React.useEffect(() => {
    if (canvasRef.current)
    signaturePad = new SignaturePad(canvasRef.current);
    signaturePad.on();

    
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl ">Digital Signature</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xs  ">Please sign below:</p>
        <canvas
          className="border-2 border-black shadow-2xl"
          ref={canvasRef}
          width="600"
          height="400"
        ></canvas>
      </div>
      <div className="flex justify-center items-center gap-6 ">
        <button
          className="w-[80px] h-[30px] border-2 border-grren-500 bg-green-500 text-white"
          onClick={clearSignature}
        >
          Clear
        </button>
        <button
          className="w-[100px] h-[30px] border-2 border-blue-500 bg-blue-500 text-white"
          onClick={saveSignature}
        >
          Save as jpeg 
        </button>
        <button
          className="w-[100px] h-[30px] border-2 border-red-500 bg-red-500 text-white"
          onClick={saveSignaturePNG}
        >
          Save as png 
        </button>
        <button
          className="w-[100px] h-[30px] border-2 border-pink-500 bg-pink-500 text-white"
          onClick={saveSignatureSVG}
        >
          Save as SVG 
        </button>
      </div>
      <div>
        <button className="w-[100px] h-[30px] border-2 border-purple-500 bg-purple-500 text-white" onClick={undoSignature}>Undo</button>
      </div>
    </div>
  );
};

export default App;
