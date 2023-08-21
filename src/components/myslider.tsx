import * as Slider from "@radix-ui/react-slider";
import "./styles.css";
import { useEffect, useState } from "react";

const SliderDemo = ({onSliderChange, startTimestamp, endTimestamp}:any) => {
  console.log(startTimestamp, endTimestamp)
  
  const monthsBetweenDates = (date1, date2) => {
    const one = new Date(date1);
    const two = new Date(date2);
    let months = (two.getFullYear() - one.getFullYear()) * 12;
    months -= one.getMonth();
    months += two.getMonth();
    return months <= 0 ? 0 : months;
  };
  
  const min = 0;
  const max = monthsBetweenDates(startTimestamp, endTimestamp);
  
  const [values, setValues] = useState([min, max]) // últimos 6 meses
  const [isDragging, setIsDragging] = useState(false);



  function handleChangeSlider(data){
    setValues(data);
    if (!isDragging) {
        onSliderChange(data);
    }
  }



  // Se os timestamps não estiverem definidos ainda, não renderize o slider
  if (!startTimestamp || !endTimestamp) return null;

  return (
    <Slider.Root
      value={values}
      onValueChange={handleChangeSlider}
      className="SliderRoot"
      min={min}
      max={max}
      step={1}
      minStepsBetweenThumbs={1}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => {
        setIsDragging(false);
        onSliderChange(values);
    }}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};

export default SliderDemo;
