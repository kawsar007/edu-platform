/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";

const StarRating = ({ rating }) => {
  const stars = new Array(rating).fill(0);
  return (
    <>
      {stars.map((star, index) => (
        <Image key={index} src={`/assets/star.svg`} width={20} height={20} />
      ))}
    </>
  );
};

export default StarRating;