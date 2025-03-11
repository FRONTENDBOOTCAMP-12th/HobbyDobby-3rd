function Title({ children }: { children: string }) {
  return <title>{`${children} | ${import.meta.env.VITE_SERVICE_NAME}`}</title>;
}

export default Title;
