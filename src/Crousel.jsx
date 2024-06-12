import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the styles

const Crousel = () => {
  const onChange = (index) => {
    console.log(`Changed to slide ${index}`);
  };

  const onClickItem = (index) => {
    console.log(`Clicked item at index ${index}`);
  };

  const onClickThumb = (index) => {
    console.log(`Clicked thumbnail at index ${index}`);
  };

  return (
    <Carousel
      showArrows={true}
      onChange={onChange}
      onClickItem={onClickItem}
      onClickThumb={onClickThumb}
      swipeable={true} // enables swiping
      emulateTouch={true} // emulates touch events on desktop
      infiniteLoop={true} // enables infinite looping
    >
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWRH-nQDzmIWl6S0bIrK8TErmUJ1r8VqlzA&s"
          alt="Slide 1"
        />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img
          src="https://culturedvultures.com/wp-content/uploads/2022/09/Dragon-Ball-Super.jpg"
          alt="Slide 2"
        />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpNnrR9C-hjba2ni6TfGn4DOyh1FU7b2I1w&s"
          alt="Slide 3"
        />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6qZJW4f8DF3i1Q_3B5Vfg2YSQM0sxvZliqA&s"
          alt="Slide 4"
        />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb1r3CkeebJnk2TfrhSGw2FTEStqv8JPpqAw&s"
          alt="Slide 5"
        />
        <p className="legend">Legend 5</p>
      </div>
      <div>
        <img
          src="https://www.fortressofsolitude.co.za/wp-content/uploads/2023/06/Gohans-New-Form-in-Dragon-Ball-Super-Super-Hero-Explained.jpg"
          alt="Slide 6"
        />
        <p className="legend">Legend 6</p>
      </div>
    </Carousel>
  );
};

export default Crousel;
