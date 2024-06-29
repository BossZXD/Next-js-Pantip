export const scroll = (
  scrollRef: React.RefObject<HTMLDivElement>,
  direction: 'left' | 'right',
) => {
  if (scrollRef.current) {
    const scrollAmount = scrollRef.current.clientWidth / 2;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
};
