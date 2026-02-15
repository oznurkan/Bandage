const OrderNavbar = ({ activeStep, setActiveStep }) => {
  return (
    <main className="w-full pt-30 pb-10 xl:pt-2">
      <section className="flex flex-col w-full gap-1 font-montserrat px-4 xl:flex-row ">
        <article
          className={`flex w-full items-center gap-5 border border-b-5 mx-auto p-3 flex-1
                ${
                  activeStep === 1
                    ? "border-primary-color bg-white"
                    : "border-second-text-color bg-light-gray-1"
                }`}
        >
          <h1
            className={`font-bold text-3xl leading-8
                        ${activeStep === 1 ? "text-primary-color" : "text-second-text-color"}`}
          >
            1
          </h1>
          <div className="flex flex-col font-normal items-baseline text-sm text-second-text-color leading-6">
            <h1
              className={`font-bold text-2xl
                        ${activeStep === 1 ? "text-primary-color" : "text-second-text-color"}`}
            >
              Address Information
            </h1>
            <h3>Ev</h3>
            <div className="flex gap-2">
              <h3>islamsary mahllesi merkez sokak no:35 kat:3 daire:3</h3>
            </div>
            <div className="flex gap-2">
              <h3>0006</h3>
              <div>-</div>
              <h3>İzmir-Bornova</h3>
            </div>
          </div>
        </article>
        <article
          onClick={() => setActiveStep(2)}
          className={`flex w-full items-center gap-5 border border-b-5 mx-auto p-3 flex-1
                ${
                  activeStep === 2
                    ? "border-primary-color bg-white"
                    : "border-second-text-color bg-light-gray-1"
                }`}
        >
          <h1
            className={`font-bold text-2xl leading-8
                    ${activeStep === 2 ? "text-primary-color" : "text-second-text-color"}`}
          >
            2
          </h1>
          <div className="flex flex-col h-full gap-5 items-baseline font-normal text-sm text-second-text-color leading-6">
            <h1
              className={`font-bold text-2xl
                        ${activeStep === 2 ? "text-primary-color" : "text-second-text-color"}`}
            >
              Payment Options
            </h1>
            <h5>
              You can securely complete your payment using a
              <span className="underline font-bold">Debit / Credit Card</span>{" "}
              veya <span className="underline font-bold">Shopping Loan</span>.
            </h5>
          </div>
        </article>
      </section>
    </main>
  );
};

export default OrderNavbar;
