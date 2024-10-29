import { HeroSection } from "./home/HeroSection";
import { HeroImage } from "./home/HeroImage";
import { Stats } from "./home/Stats";

export default function Page() {
    return (
        <section className="relative container px-4 pb-8 xl:px-16">
            <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_500px] 2xl:grid-cols-[1fr_568px] md:justify-center gap-6 mb-6">
                <HeroSection />
                <HeroImage />
            </div>

            <Stats />
        </section>
    );
}
