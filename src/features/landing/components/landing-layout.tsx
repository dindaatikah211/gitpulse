import { LandingNavbar }     from "./landing-navbar";
import { LandingHero }       from "./landing-hero";
import { LandingFeatures }   from "./landing-features";
import { LandingHowItWorks } from "./landing-how-it-works";
import { LandingRoles }      from "./landing-roles";
import { LandingTechStack }  from "./landing-tech-stack";
import { LandingCTA }        from "./landing-cta";
import { LandingFooter }     from "./landing-footer";

export function LandingLayout() {
  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingRoles />
      <LandingTechStack />
      <LandingCTA />
      <LandingFooter />
    </main>
  );
}