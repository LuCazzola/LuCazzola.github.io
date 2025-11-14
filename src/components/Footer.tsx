import { Mail, Phone, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-white">Contact me!</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white/80 mb-2">Organization mail</h4>
                <a href="mailto:luca.cazzola-1@studenti.unitn.it" className="flex items-center justify-center gap-2 text-white hover:text-white/80 transition-colors">
                  <Mail className="h-4 w-4" />
                  luca.cazzola-1@studenti.unitn.it
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold text-white/80 mb-2">Personal mail</h4>
                <a href="mailto:luca.cazzola.2001@gmail.com" className="flex items-center justify-center gap-2 text-white hover:text-white/80 transition-colors">
                  <Mail className="h-4 w-4" />
                  luca.cazzola.2001@gmail.com
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white/80 mb-2">Mobile</h4>
                <a href="tel:+393500323641" className="flex items-center justify-center gap-2 text-white hover:text-white/80 transition-colors">
                  <Phone className="h-4 w-4" />
                  +39 350 032 3641
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold text-white/80 mb-2">LinkedIn</h4>
                <a 
                  href="https://linkedin.com/in/luca-cazzola-5699a92a9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-white hover:text-white/80 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  luca-cazzola-5699a92a9
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Luca Cazzola. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
