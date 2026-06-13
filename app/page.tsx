import { Hero } from "@/components/hero";
import { ProductsShowcase } from "@/components/products-showcase";
import { FeaturesSection } from "@/components/features-section";
import { Door3DConfigurator } from "@/components/door-3d-configurator";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <ProductsShowcase />
      <FeaturesSection />
      <Door3DConfigurator />
      <TestimonialsSection />
      <ContactForm />
    </div>
  );
}
