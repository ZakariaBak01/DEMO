import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass, alt }) => (
  <div className={clipClass}>
    <img src={src} alt={alt} className="size-full object-cover" loading="lazy" />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/business/feature-1.jpg"
            alt="Team discussing a business plan"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/business/hero-3.jpg"
            alt="Business analysis on a laptop"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute right-4 top-20 hidden h-96 w-60 opacity-40 lg:block lg:w-80">
          <ImageClipBox
            src="/business/feature-4.jpg"
            alt="Professional working in a modern office"
            clipClass="sword-man-clip-path h-full"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Your next chapter starts here
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild <br /> your business <br /> t<b>o</b>gether."
            containerClass="w-full text-center"
          />

          <Button title="Explore our services" containerClass="mt-10 cursor-pointer" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
