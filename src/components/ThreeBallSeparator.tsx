import React from "react";

const ThreeBallSeparator: React.FC = () => {
  return (
    <section className="my-12 md:my-16" aria-hidden="true">
      <div className="flex justify-center">
        <div className="flex items-center gap-3 md:gap-4">
          <div
            className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary transform transition-transform duration-200 hover:scale-110"
            style={{ boxShadow: '0 14px 30px rgba(2,6,23,0.18)' }}
          />
          <div
            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary transform transition-transform duration-200 hover:scale-110"
            style={{ boxShadow: '0 20px 40px rgba(2,6,23,0.22)' }}
          />
          <div
            className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary transform transition-transform duration-200 hover:scale-110"
            style={{ boxShadow: '0 14px 30px rgba(2,6,23,0.18)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ThreeBallSeparator;
