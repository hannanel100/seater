const ParashatShavoa = ({ parashat }: { parashat: string | undefined }) => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-bold">פרשת השבוע</h3>
      <h1 className="text-4xl">{parashat}</h1>
    </div>
  );
};

export default ParashatShavoa;
