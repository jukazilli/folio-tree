import { useState } from 'react';
import { 
  Users, Layers, ArrowUpRight, CheckCircle2, Copy, Eye, SlidersHorizontal, ArrowRight, MousePointer2,
  FileText, Database, Network, Layout, Settings, Search, Briefcase, Plus,
  Palette, Component, MonitorPlay, Type, GripVertical, EyeOff, Edit3, Smartphone,
  FolderPlus, BoxSelect, Sparkles, Globe, X, Calendar, CheckCircle, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('tokens');
  const [isDsOpen, setIsDsOpen] = useState(true);
  const [isConceptsOpen, setIsConceptsOpen] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-folio-bg text-folio-cream font-sans overflow-hidden">
       {/* Sidebar Navigation */}
       <aside className="md:w-64 border-b md:border-b-0 md:border-r border-white/5 flex flex-col shrink-0 bg-[#161817] z-50">
         <div className="p-5 md:p-6 flex items-center justify-between md:flex-col md:items-start md:justify-center">
           <div className="flex items-center gap-2 mb-0 md:mb-3">
             <div className="w-3 h-5 md:w-5 md:h-7 bg-folio-red rounded-l-full rounded-r-sm skew-x-[-15deg]" />
             <h1 className="text-tight-display text-folio-cream text-xl md:text-3xl tracking-tighter mt-1">
               FolioTree DS
             </h1>
           </div>
           <p className="font-mono text-[9px] md:text-[10px] text-folio-cream/40 uppercase tracking-widest hidden md:block">
             Design System • v1.0
           </p>
         </div>
         
         <nav className="flex flex-col gap-1 px-3 md:px-4 pb-3 md:pb-0 overflow-y-auto hide-scrollbar flex-1">
            
            <NavGroup title="Foundations" isOpen={isDsOpen} onToggle={() => setIsDsOpen(!isDsOpen)}>
                <NavItem icon={<Palette size={14}/>} label="Design Tokens" active={activeTab==='tokens'} onClick={()=>setActiveTab('tokens')} isSub />
                <NavItem icon={<Type size={14}/>} label="Typography System" active={activeTab==='typography'} onClick={()=>setActiveTab('typography')} isSub />
            </NavGroup>

            <NavGroup title="UI Components" isOpen={true}>
                <NavItem icon={<Component size={14}/>} label="Base Elements" active={activeTab==='base'} onClick={()=>setActiveTab('base')} isSub />
                <NavItem icon={<Type size={14}/>} label="Data Entry" active={activeTab==='data_entry'} onClick={()=>setActiveTab('data_entry')} isSub />
                <NavItem icon={<Briefcase size={14}/>} label="Data Display" active={activeTab==='data_display'} onClick={()=>setActiveTab('data_display')} isSub />
                <NavItem icon={<Layout size={14}/>} label="Feedback & Overlays" active={activeTab==='feedback'} onClick={()=>setActiveTab('feedback')} isSub />
            </NavGroup>
            
            <NavGroup title="UX Patterns" isOpen={true}>
                <NavItem icon={<Layers size={14}/>} label="Forms & Validation" active={activeTab==='forms'} onClick={()=>setActiveTab('forms')} isSub />
                <NavItem icon={<Database size={14}/>} label="Master vs. Derived" active={activeTab==='master_derived'} onClick={()=>setActiveTab('master_derived')} isSub />
            </NavGroup>

            <div className="hidden md:block mt-6 mb-3 border-t border-white/5" />
            
            <NavGroup title="App Concepts" isOpen={isConceptsOpen} onToggle={() => setIsConceptsOpen(!isConceptsOpen)}>
                <NavItem icon={<Layers size={14}/>} label="Landing" active={activeTab==='landing'} onClick={()=>setActiveTab('landing')} isSub />
                <NavItem icon={<Layout size={14}/>} label="SaaS Concept" active={activeTab==='saas'} onClick={()=>setActiveTab('saas')} isSub />
                <NavItem icon={<Globe size={14}/>} label="Public Output" active={activeTab==='public'} onClick={()=>setActiveTab('public')} isSub />
            </NavGroup>
         </nav>
       </aside>

       {/* Main Viewport */}
       <main className="flex-1 overflow-y-auto relative h-full"> 
         {activeTab === 'tokens' && <TokensView />}
         {activeTab === 'typography' && <TypographyView />}
         
         {activeTab === 'base' && <ComponentsView />}
         {/* Placeholder views for new categories to maintain functionality */}
         {activeTab === 'data_entry' && <ComponentsView />}
         {activeTab === 'data_display' && <ComponentsView />}
         {activeTab === 'feedback' && <ComponentsView />}
         {activeTab === 'forms' && <ComponentsView />}
         {activeTab === 'master_derived' && <ComponentsView />}

         {activeTab === 'landing' && <LandingConcept />}
         {activeTab === 'saas' && <SaaSUI />}
         {activeTab === 'public' && <div className="min-h-full pb-24 text-folio-dark bg-folio-bg"><PublicOutputConcept /></div>}
       </main>
    </div>
  );
}

function NavGroup({ title, isOpen, onToggle, children }: { title: string, isOpen?: boolean, onToggle?: () => void, children: React.ReactNode }) {
    return (
        <div className="mb-2">
            <div 
                className="font-mono text-[10px] text-folio-cream/40 px-2 py-2 uppercase tracking-widest cursor-pointer hover:text-folio-cream/60 flex justify-between items-center"
                onClick={onToggle}
            >
                {title}
                {onToggle && <span className="opacity-50">{isOpen ? '−' : '+'}</span>}
            </div>
            {isOpen !== false && (
                <div className="flex flex-col gap-0.5 mt-1 border-l border-white/5 ml-2 pl-2">
                    {children}
                </div>
            )}
        </div>
    )
}

function NavItem({ icon, label, active, onClick, isSub }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, isSub?: boolean }) {
  return (
     <button 
       onClick={onClick}
       className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap md:whitespace-normal text-left
         ${active ? 'bg-white/10 text-folio-cream font-bold' : 'text-folio-cream/50 hover:bg-white/5 hover:text-folio-cream/80'}`}
     >
        <span className={`${active ? 'text-folio-green-light' : 'opacity-70'} ${isSub ? 'scale-90' : ''}`}>{icon}</span>
        {label}
     </button>
  )
}

// -----------------------------------------------------------------------------
// DESIGN TOKENS SHOWCASE (BRAND & GUIDELINES)
// -----------------------------------------------------------------------------
function TokensView() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-16 pb-24">
      <div className="mb-12 border-b border-white/10 pb-8">
         <h2 className="text-tight-display text-4xl text-folio-cream mb-4">Design Tokens</h2>
         <p className="font-mono text-folio-cream/60 text-sm mb-4">The foundational visual values of FolioTree built for scale, mapping physical CSS variables to multi-context semantic themes (Auth, SaaS, Public).</p>
         <div className="flex gap-2">
            <span className="bg-folio-green-light/10 text-folio-green-light px-2 py-1 rounded font-mono text-[10px] uppercase border border-folio-green-light/20">src/styles/tokens.css</span>
            <span className="bg-folio-red/10 text-folio-red px-2 py-1 rounded font-mono text-[10px] uppercase border border-folio-red/20">src/styles/theme.css</span>
         </div>
      </div>

      <TokenSection title="1. Base Colors (Physical)" id="colors">
         <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            <ColorSwatch name="Folio BG" hex="#1B1E1D" token="--color-folio-bg" cls="bg-[#1B1E1D] border border-white/10" />
            <ColorSwatch name="Folio Red" hex="#DB1F17" token="--color-folio-red" cls="bg-[#DB1F17]" />
            <ColorSwatch name="Green Deep" hex="#084C3E" token="--color-folio-green-deep" cls="bg-[#084C3E]" />
            <ColorSwatch name="Green Light" hex="#90E099" token="--color-folio-green-light" cls="bg-[#90E099]" />
            <ColorSwatch name="Folio Cream" hex="#F3EFE6" token="--color-folio-cream" cls="bg-[#F3EFE6]" />
            <ColorSwatch name="Folio Dark" hex="#121212" token="--color-folio-dark" cls="bg-[#121212] border border-white/10" />
         </div>
      </TokenSection>

      <TokenSection title="1.1 Semantic Themes (Shadcn + Folio Compatible)" id="semantic-colors">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SemanticColor usage="Background / Ambient" token="--color-background" mapsTo="folio-bg" />
            <SemanticColor usage="Surface / Cards" token="--color-card" mapsTo="folio-cream" />
            <SemanticColor usage="Primary Actions" token="--color-primary" mapsTo="folio-red" />
            <SemanticColor usage="Secondary Content" token="--color-secondary" mapsTo="folio-green-deep" />
            <SemanticColor usage="Text / Reading" token="--color-foreground" mapsTo="folio-cream" />
            <SemanticColor usage="Card Text" token="--color-card-foreground" mapsTo="folio-dark" />
            <SemanticColor usage="Success / Tags" token="--color-accent" mapsTo="folio-green-light" />
            <SemanticColor usage="Borders / UI Rings" token="--color-border" mapsTo="folio-cream/10" />
         </div>
      </TokenSection>

      <div className="grid md:grid-cols-2 gap-12">
         <TokenSection title="2. Spacing Base" id="spacing" compact>
            <div className="space-y-3">
               <SizeScale name="--spacing-2xs" size="6px" w="w-1.5" />
               <SizeScale name="--spacing-xs" size="8px" w="w-2" />
               <SizeScale name="--spacing-sm" size="12px" w="w-3" />
               <SizeScale name="--spacing-md" size="16px" w="w-4" />
               <SizeScale name="--spacing-lg" size="24px" w="w-6" />
               <SizeScale name="--spacing-xl" size="32px" w="w-8" />
               <SizeScale name="--spacing-2xl" size="40px" w="w-10" />
            </div>
         </TokenSection>

         <TokenSection title="3. Radius (Corners)" id="radius" compact>
            <div className="space-y-4">
               <ShapeScale name="--radius-sm" desc="Technical / Forms (4px)" cls="rounded-sm" />
               <ShapeScale name="--radius-md" desc="Standard UI (8px)" cls="rounded-md" />
               <ShapeScale name="--radius-lg" desc="Cards / Modals (12px)" cls="rounded-lg" />
               <ShapeScale name="--radius-card" desc="Folio Heroic (24px)" cls="rounded-[24px]" />
               <ShapeScale name="--radius-full" desc="Pills / Avatars" cls="rounded-full" />
            </div>
         </TokenSection>

         <TokenSection title="4. Borders" id="borders" compact>
             <div className="space-y-4 text-sm font-mono text-folio-cream/80">
                <div className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-folio-green-light">--border-width-thin</span><span>1px</span></div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-folio-green-light">--border-width-base</span><span>1.5px</span></div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-folio-green-light">--border-width-thick</span><span>2px</span></div>
                <div className="flex justify-between items-center"><span className="text-folio-green-light">--border-width-heavy</span><span>4px</span></div>
             </div>
         </TokenSection>

         <TokenSection title="5 & 10. Shadows & Elevation" id="shadows" compact>
             <div className="space-y-4">
                <ElevationScale name="--shadow-elevation-base" shadows="--shadow-sm" />
                <ElevationScale name="--shadow-elevation-card" shadows="--shadow-md" />
                <ElevationScale name="--shadow-elevation-floating" shadows="--shadow-xl" />
             </div>
         </TokenSection>

         <TokenSection title="7. Motion (Timing)" id="motion" compact>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
               <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-folio-green-light mb-1">--animate-base</div>
                  <div className="text-folio-cream/50">200ms</div>
               </div>
               <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-folio-red mb-1">--ease-folio-spring</div>
                  <div className="text-[10px] text-folio-cream/50">cubic-bezier(0.34, 1.56, 0.64, 1)</div>
               </div>
            </div>
         </TokenSection>

         <TokenSection title="11. Z-Index Scale" id="zindex" compact>
             <div className="space-y-3 font-mono text-xs text-folio-cream/80">
                <div className="flex justify-between p-2 hover:bg-white/5 rounded"><span className="text-folio-green-light">--z-base</span><span>0</span></div>
                <div className="flex justify-between p-2 hover:bg-white/5 rounded"><span className="text-folio-green-light">--z-docked</span><span>10</span></div>
                <div className="flex justify-between p-2 hover:bg-white/5 rounded"><span className="text-folio-green-light">--z-dropdown / --z-sticky</span><span>20-30</span></div>
                <div className="flex justify-between p-2 hover:bg-white/5 rounded"><span className="text-folio-green-light">--z-overlay / --z-modal</span><span>50-60</span></div>
                <div className="flex justify-between p-2 hover:bg-white/5 rounded"><span className="text-folio-green-light">--z-toast / --z-tooltip</span><span>80-90</span></div>
             </div>
         </TokenSection>
      </div>

    </div>
  )
}

function TokenSection({ title, id, children, compact }: { title: string, id: string, children: React.ReactNode, compact?: boolean }) {
   return (
      <section id={id} className={`bg-black/20 border border-white/5 p-6 md:p-8 rounded-2xl ${compact ? '' : 'mb-12'}`}>
         <h3 className="font-mono text-xs text-folio-cream/40 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">{title}</h3>
         {children}
      </section>
   )
}

function ColorSwatch({ name, hex, token, cls }: { name: string, hex: string, token: string, cls: string }) {
  return (
    <div className="flex flex-col gap-3 group">
       <div className={`w-full aspect-video md:aspect-square rounded-xl ${cls} shadow-inner group-hover:scale-[1.02] transition-transform`} />
       <div>
         <div className="font-bold text-sm text-folio-cream leading-none mb-1">{name}</div>
         <div className="font-mono text-[10px] text-folio-green-light uppercase">{hex}</div>
         <div className="font-mono text-[8px] text-folio-cream/30 mt-2 border-t border-white/10 pt-1">{token}</div>
       </div>
    </div>
  )
}

function SemanticColor({ usage, token, mapsTo }: { usage: string, token: string, mapsTo: string }) {
   return (
      <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
         <div className="text-xs font-bold text-folio-cream mb-3">{usage}</div>
         <div className="font-mono text-[10px] text-folio-green-light mb-1">{token}</div>
         <div className="font-mono text-[9px] text-folio-cream/40 px-2 py-1 bg-black/30 rounded inline-block">maps to: {mapsTo}</div>
      </div>
   )
}

function SizeScale({ name, size, w }: { name: string, size: string, w: string }) {
   return (
      <div className="flex items-center gap-4 group">
         <div className="w-16 shrink-0 font-mono text-[10px] text-folio-cream/50 text-right">{size}</div>
         <div className="flex-1 bg-white/5 h-8 rounded-md flex items-center p-1">
            <div className={`h-full bg-folio-green-deep ${w} rounded-sm transition-all group-hover:bg-folio-green-light`} />
         </div>
         <div className="w-24 shrink-0 font-mono text-[10px] text-folio-green-light">{name}</div>
      </div>
   )
}

function ShapeScale({ name, desc, cls }: { name: string, desc: string, cls: string }) {
   return (
      <div className="flex justify-between items-center group">
         <div>
            <div className="font-mono text-xs text-folio-green-light">{name}</div>
            <div className="text-[10px] text-folio-cream/50 mt-1">{desc}</div>
         </div>
         <div className={`w-16 h-10 border border-white/20 bg-white/5 ${cls} group-hover:bg-folio-cream/10 transition-colors`} />
      </div>
   )
}

function ElevationScale({ name, shadows }: { name: string, shadows: string }) {
   return (
      <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
         <div>
            <div className="font-mono text-xs text-folio-green-light mb-1">{name}</div>
            <div className="font-mono text-[10px] text-folio-cream/40">var({shadows})</div>
         </div>
         <div className="w-10 h-10 bg-folio-cream rounded-lg shadow-xl" />
      </div>
   )
}

// -----------------------------------------------------------------------------
// COMPONENTS SHOWCASE
// -----------------------------------------------------------------------------
function ComponentsView() {
  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto">
      <div className="mb-12">
         <h2 className="text-tight-display text-4xl text-folio-cream mb-4">UI Components</h2>
         <p className="font-mono text-folio-cream/60 text-sm">Reusable elemental blocks and interface containers.</p>
      </div>

      <section className="mb-16">
         <h3 className="font-mono text-xs text-folio-cream/40 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Buttons & Actions</h3>
         <div className="flex flex-wrap gap-6 items-center p-8 bg-white/5 rounded-folio-xl border border-white/10 text-folio-dark">
            <div className="flex flex-col gap-2 items-center">
               <button className="btn-primary flex items-center gap-2">Generate Profile <ArrowRight size={18}/></button>
               <span className="font-mono text-[10px] text-folio-cream/40 px-2">.btn-primary</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
               <button className="btn-secondary flex items-center gap-2"><Layout size={18}/> View Output</button>
               <span className="font-mono text-[10px] text-folio-cream/40 px-2">.btn-secondary</span>
            </div>
            
            <div className="flex flex-col gap-2 items-center ml-auto">
               <button className="px-6 py-3 bg-folio-cream text-folio-red font-bold rounded-full hover:bg-white transition-all active:scale-95 flex items-center gap-2">
                 <Copy size={18}/> Generic Ghost
               </button>
               <span className="font-mono text-[10px] text-folio-cream/40 px-2">Custom Variant</span>
            </div>
         </div>
      </section>

      <section>
         <h3 className="font-mono text-xs text-folio-cream/40 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Structural Bento Cards</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-folio-cream">
            <div className="border border-white/10 bg-white/5 rounded-folio-xl p-10 min-h-[260px] flex flex-col justify-between group cursor-pointer hover:bg-white/10 transition-colors shadow-xl">
               <div className="flex items-center gap-3 text-folio-red font-mono text-sm tracking-widest uppercase">
                 <div className="w-2 h-2 rounded-full bg-folio-red" />
                 Red Accents Allowed
               </div>
               <div className="text-center">
                 <span className="font-display font-bold text-4xl group-hover:scale-105 transition-transform inline-block">Chumbo Dark</span>
               </div>
               <code className="font-mono text-[10px] bg-black/50 px-3 py-1.5 rounded text-center opacity-50 block w-full mt-4">.border-white/10 .bg-white/5</code>
            </div>
            
            <div className="bento-card-green p-10 min-h-[260px] flex flex-col justify-between group cursor-pointer hover:scale-[1.02] shadow-2xl">
               <div className="flex items-center gap-3 text-folio-green-light font-mono text-sm tracking-widest uppercase opacity-70">
                 <div className="w-2 h-2 rounded-full bg-folio-green-light" />
                 Macro Structure Allowed
               </div>
               <div className="text-center">
                 <span className="font-display font-bold text-4xl group-hover:scale-105 transition-transform inline-block">Green Deep</span>
               </div>
               <code className="font-mono text-[10px] bg-black/20 px-3 py-1.5 rounded text-center opacity-50 block w-full mt-4">.bento-card-green</code>
            </div>
            
            <div className="bento-card-cream col-span-1 md:col-span-2 p-10 min-h-[260px] flex flex-col justify-between group cursor-pointer hover:scale-[1.01] shadow-2xl text-folio-dark">
               <div className="flex items-center gap-3 text-folio-green-deep font-mono text-sm tracking-widest uppercase shadow-sm">
                 <div className="w-2 h-2 rounded-full bg-folio-red" />
                 Primary Organic Content
               </div>
               <div className="text-center">
                 <span className="font-display font-bold text-5xl group-hover:scale-105 transition-transform inline-block text-folio-dark">Folio Cream Master</span>
               </div>
               <code className="font-mono text-[10px] bg-folio-green-deep/5 text-folio-green-deep px-3 py-1.5 rounded text-center block w-full mt-4 opacity-70">.bento-card-cream</code>
            </div>
         </div>
      </section>
      <section className="mt-16">
         <h3 className="font-mono text-xs text-folio-cream/40 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Data Entry Kit (Forms)</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-folio-dark mb-16">
            <div className="bento-card-cream p-10 flex flex-col gap-6 shadow-xl">
               <h4 className="font-display font-bold text-2xl text-folio-green-deep mb-2">Input Fields</h4>
               
               <div className="flex flex-col gap-1 w-full relative">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/50 font-bold">Job Title</label>
                  <input 
                     className="bg-transparent border-b-2 border-folio-dark/20 py-2 font-bold font-sans text-xl focus:outline-none focus:border-folio-red transition-colors placeholder:text-folio-dark/20" 
                     placeholder="e.g. Senior Frontend Engineer" 
                     defaultValue="Design System Lead"
                  />
               </div>

               <div className="flex flex-col gap-1 w-full relative mt-4">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/50 font-bold">Description <span className="opacity-50 normal-case font-sans font-normal ml-1">(Markdown supported)</span></label>
                  <textarea 
                     className="bg-folio-dark/5 border border-folio-dark/10 rounded-xl p-4 font-medium font-sans text-sm min-h-[120px] focus:outline-none focus:border-folio-green-deep focus:bg-transparent resize-none transition-colors" 
                     placeholder="Describe your impact..."
                     defaultValue="Led the architectural restructuring of the UI component library resulting in a 40% reduction in time-to-market for new features."
                  />
               </div>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-folio-xl p-10 text-folio-cream shadow-xl flex flex-col gap-6">
               <h4 className="font-display font-bold text-2xl mb-2 text-white">Toggles & Tags</h4>
               
               <div className="bg-black/20 border border-white/5 rounded-xl p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <div className="font-bold text-sm">Public Visibility</div>
                        <div className="font-mono text-[10px] text-folio-cream/40">Show on generated outputs</div>
                     </div>
                     {/* Custom Toggle */}
                     <div className="w-12 h-6 bg-folio-green-light rounded-full relative cursor-pointer shadow-inner shadow-black/20">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-folio-green-deep rounded-full shadow-md" />
                     </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                     <div>
                        <div className="font-bold text-sm text-folio-cream/50">Highlight Role</div>
                        <div className="font-mono text-[10px] text-folio-cream/30">Feature at top of resume</div>
                     </div>
                     {/* Custom Toggle (Off) */}
                     <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer border border-white/5">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-folio-cream/40 rounded-full" />
                     </div>
                  </div>
               </div>

               <div className="mt-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 font-bold mb-3 block">Taxonomy Tags</label>
                  <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1.5 bg-folio-green-light/10 text-folio-green-light border border-folio-green-light/20 rounded font-mono text-[10px] font-bold">Figma</span>
                     <span className="px-3 py-1.5 bg-folio-green-light/10 text-folio-green-light border border-folio-green-light/20 rounded font-mono text-[10px] font-bold">React</span>
                     <span className="px-3 py-1.5 bg-white/5 text-folio-cream border border-white/10 rounded font-mono text-[10px] flex items-center gap-2 hover:bg-folio-red hover:border-folio-red transition-colors cursor-pointer group">
                        Node.js <X size={10} className="group-hover:scale-125 transition-transform" />
                     </span>
                     <span className="px-3 py-1.5 bg-white/5 text-folio-cream/40 border border-white/10 border-dashed rounded font-mono text-[10px] cursor-pointer hover:text-folio-cream hover:border-white/30">+ Add Skill</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  )
}

// -----------------------------------------------------------------------------
// LANDING CONCEPT
// -----------------------------------------------------------------------------
function LandingConcept() {
  return (
    <div className="p-4 md:p-12 w-full max-w-[1200px] mx-auto min-h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full">
        
        {/* ROW 1 */}
        {/* Top Left: Main Pitch */}
        <div className="md:col-span-2 bento-card-cream p-8 md:p-12 flex items-center justify-center relative min-h-[220px]">
          <h1 className="text-tight-display text-folio-green-deep text-6xl md:text-[5rem] text-center tracking-tighter">
            update once <br/> <span className="font-editorial italic font-normal tracking-normal text-folio-red underline decoration-2 underline-offset-8">render anywhere</span>
          </h1>
          {/* Faux illustrations of documents converting */}
          <div className="absolute top-1/2 -translate-y-12 right-1/4 translate-x-8 hidden md:block">
             <div className="flex gap-1 items-end">
                <div className="w-12 h-14 border-[1.5px] border-folio-dark bg-folio-cream rounded-xl flex flex-col items-center justify-center shadow-lg -rotate-6">
                   <div className="w-5 h-1 border-[1.5px] border-folio-dark mt-1" />
                   <div className="w-3 h-1 bg-folio-green-light mt-1" />
                </div>
                <div className="w-10 h-16 border-[1.5px] border-folio-dark bg-[#FFFcf9] rounded-xl flex flex-col items-center justify-center z-10">
                   <div className="flex gap-1">
                       <div className="w-2 h-2 rounded-full bg-folio-red border border-folio-dark" />
                   </div>
                   <div className="w-4 h-1 bg-folio-dark mt-2" />
                </div>
             </div>
          </div>
        </div>

        {/* Top Right: Network / Outputs */}
        <div className="bento-card-green p-8 relative flex items-center justify-center min-h-[220px]">
          <div className="absolute top-6 left-6 w-3 h-12 bg-folio-green-light/20 rounded-full rotate-45" />
          <Network size={80} strokeWidth={1} className="text-folio-cream" />
          <div className="absolute font-mono text-folio-green-light font-bold bottom-6 right-6 flex gap-2">
            {'-> {}'}
          </div>
        </div>

        {/* ROW 2 & 3 */}
        {/* Column 1: Red Card + Chat */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="border border-white/10 bg-white/5 p-4 md:p-6 rounded-folio-xl flex flex-col justify-between aspect-square group shadow-xl">
            <div className="bg-folio-cream rounded-2xl w-full h-full p-6 md:p-8 flex flex-col relative text-folio-dark transition-transform group-hover:scale-[0.98]">
               <div className="flex justify-between font-mono text-[9px] font-bold text-folio-red">
                 <span>Master</span>
                 <span>Live Sync</span>
               </div>
               
               <div className="mt-8 flex-1">
                 <h2 className="text-tight-display text-5xl md:text-[3.5rem] leading-[0.8] italic -tracking-[0.05em] font-black">
                   Data<br/>Central
                 </h2>
               </div>
               
               <div className="font-mono text-[10px] font-bold tracking-tight opacity-50">
                 Single source of truth
               </div>

               <div className="absolute right-6 top-1/2 -translate-y-4">
                  <div className="w-10 h-10 text-folio-dark transform rotate-12">
                     <Database size={40} className="text-folio-red" />
                  </div>
               </div>
            </div>
          </div>
          <div className="bento-card-green p-6 md:p-8 flex-1 flex flex-col justify-center gap-4">
             <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-folio-green-deep text-folio-cream rounded-2xl rounded-bl-sm text-[11px] font-mono whitespace-nowrap">
                  Send me your PM resume!
                </div>
                <div className="w-6 h-6 rounded-full bg-white border border-folio-dark/10 overflow-hidden shrink-0">
                   <img src="https://picsum.photos/seed/recruiter/100" alt="Recruiter" className="w-full h-full object-cover" />
                </div>
             </div>
             <div className="flex items-center gap-2 justify-end self-start w-full">
                <div className="w-6 h-6 rounded-full bg-folio-bg border border-folio-dark/20 flex shadow-inner overflow-hidden shrink-0">
                   <img src="https://picsum.photos/seed/candidate/100" alt="Candidate" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="px-3 py-2 bg-folio-green-light text-folio-green-deep rounded-2xl rounded-bl-sm text-[11px] font-mono whitespace-nowrap font-bold">
                  foliotree.com/pm
                </div>
             </div>
          </div>
        </div>

        {/* Column 2: Logo + Avatars */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="bento-card-cream p-10 aspect-[4/2.5] flex items-center justify-center">
             <div className="flex items-center gap-3">
                <div className="w-8 h-12 bg-folio-red rounded-l-full rounded-r-sm skew-x-[-15deg] shrink-0" />
                <h2 className="text-tight-display text-folio-red text-5xl tracking-tighter ml-1">foliotree</h2>
             </div>
          </div>
          <div className="bento-card-green p-8 md:p-10 flex-1 flex flex-col items-center justify-center relative min-h-[160px]">
             <div className="bg-folio-bg text-folio-cream px-3 py-1.5 rounded-md font-mono text-[10px] mb-6 relative">
               Export generated
               <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-folio-bg rotate-45" />
             </div>
             {/* Simulating Outputs from Master */}
             <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-folio-cream border-[1.5px] border-folio-bg flex items-center justify-center shadow-lg">
                  <FileText size={18} strokeWidth={2.5} className="text-folio-dark" />
                </div>
                <div className="w-12 h-12 rounded-full bg-folio-green-light border-[1.5px] border-folio-bg flex items-center justify-center z-10 shadow-lg">
                  <Layout size={18} strokeWidth={2.5} className="text-folio-green-deep" />
                </div>
                <div className="w-12 h-12 rounded-full bg-folio-cream border-[1.5px] border-folio-bg flex items-center justify-center shadow-lg">
                   <Briefcase size={18} strokeWidth={2.5} className="text-folio-dark" />
                </div>
             </div>
             {/* Mouse pointer */}
             <div className="absolute bottom-4 left-[55%] pointer-events-none">
                <MousePointer2 className="fill-folio-dark text-folio-cream rotate-[-20deg]" size={24} />
             </div>
          </div>
        </div>

        {/* Column 3: Tall Right */}
        <div className="bento-card-cream p-10 md:p-12 flex flex-col items-center text-center">
           <h2 className="text-tight-display text-folio-red text-5xl md:text-[3.5rem] tracking-tighter leading-[0.85] mt-4">
             Distribute <br/>
             <span className="font-editorial italic font-normal tracking-normal text-folio-dark underline decoration-[1.5px] underline-offset-4 mt-2 inline-block">Everywhere</span>
           </h2>
           <p className="text-folio-red font-mono text-xs font-bold mt-6 tracking-tight uppercase">
             [ Your Career API ]
           </p>

           <div className="mt-auto pt-16 flex items-end justify-center w-full relative h-[180px]">
              {/* Abstract representation of generating docs */}
              <div className="absolute bottom-0 flex items-end">
                 {/* PDF Left */}
                 <div className="w-16 h-24 bg-folio-red rounded-t-2xl border-[1.5px] border-folio-dark translate-y-2 -rotate-6 shadow-sm overflow-hidden p-2">
                    <div className="w-8 h-1 bg-folio-cream mb-1" />
                    <div className="w-full h-1 bg-folio-cream/50 mb-1" />
                    <div className="w-10 h-1 bg-folio-cream/50" />
                 </div>
                 {/* Web Portal Center */}
                 <div className="w-24 h-36 bg-folio-cream rounded-t-3xl border-[1.5px] border-folio-dark z-10 flex flex-col items-center pt-2 shadow-xl">
                    <div className="w-16 h-12 bg-folio-green-light rounded-2xl border border-folio-dark mt-2 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-folio-green-deep" />
                    </div>
                    <div className="w-12 h-1 bg-folio-dark/20 mt-4 rounded-full" />
                 </div>
                 {/* Json/Data Right */}
                 <div className="w-16 h-28 bg-folio-green-deep rounded-t-2xl border-[1.5px] border-folio-dark -translate-x-2 translate-y-1 rotate-6 shadow-sm p-3">
                    <div className="font-mono text-[8px] text-folio-green-light opacity-50">{`{`}</div>
                    <div className="font-mono text-[8px] text-folio-green-light ml-1">data</div>
                    <div className="font-mono text-[8px] text-folio-green-light opacity-50">{`}`}</div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SAAS UI CORE (Master Profile Editor)
// -----------------------------------------------------------------------------
function SaaSUI() {
  const [activeNav, setActiveNav] = useState('master');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen relative">
      
      {/* Top Bar matching identity */}
      <header className="flex justify-between items-center mb-8 px-2 mt-4 md:mt-0">
         <div className="flex items-center gap-3">
            <div className="w-8 h-10 bg-folio-red rounded-l-full rounded-r-sm skew-x-[-15deg]" />
            <h1 className="text-tight-display text-folio-cream text-4xl mt-1 tracking-tighter">
              FolioTree
            </h1>
         </div>
         <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center font-mono text-xs gap-6 mr-4 tracking-widest uppercase">
               <button 
                 onClick={() => setActiveNav('master')} 
                 className={`transition-colors pb-0.5 ${activeNav === 'master' ? 'text-folio-green-light border-b-2 border-folio-green-light font-bold' : 'text-folio-cream/50 hover:text-folio-cream'}`}>
                 Master Profile
               </button>
               <button 
                 onClick={() => setActiveNav('versions')} 
                 className={`transition-colors pb-0.5 ${activeNav === 'versions' ? 'text-folio-green-light border-b-2 border-folio-green-light font-bold' : 'text-folio-cream/50 hover:text-folio-cream'}`}>
                 Versions & Outputs
               </button>
               <button className="text-folio-cream/50 hover:text-folio-cream transition-colors pb-0.5">Settings</button>
            </div>
            <div className="w-10 h-10 rounded-full bg-folio-cream border-2 border-transparent flex flex-col justify-center items-center overflow-hidden cursor-pointer hover:scale-105 transition-transform shrink-0">
               <div className="w-4 h-4 bg-folio-green-deep rounded-full mb-0.5" />
               <div className="w-6 h-4 bg-folio-green-deep outline-full rounded-t-xl" />
            </div>
         </div>
      </header>

      {/* Editor Grid Layout */}
      {activeNav === 'master' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
           
           {/* Left Column: Structural Profile Blocks (The Input) */}
           <div className="lg:col-span-8 flex flex-col gap-4">
              
              {/* Header */}
              <div className="mb-4">
                 <div className="flex items-center gap-2 font-mono text-[10px] text-folio-green-light uppercase font-bold tracking-widest mb-4 border border-folio-green-light/20 px-3 py-1.5 rounded-full inline-flex">
                   <div className="w-2 h-2 rounded-full bg-folio-green-light animate-pulse" />
                   Editor Sync Active
                 </div>
                 <h2 className="text-tight-display text-folio-cream text-5xl mb-2">Editor: Central Data</h2>
                 <p className="font-sans text-folio-cream/60 max-w-2xl text-sm leading-relaxed">
                   Manage your single source of truth. Drag to reorder how sections appear structurally. Data entered here trickles down to all your <span className="font-editorial italic underline decoration-1 underline-offset-4 text-folio-cream">published outputs</span>.
                 </p>
              </div>

              {/* Profile Sections Stack */}
              <div className="flex flex-col gap-8">
                 
                 <ProfileSectionBlock title="Basic Info & Contacts" type="cream" isVisible={true} isFixed={true}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                       <MiniField label="Full Name" value="James D." />
                       <MiniField label="Headline" value="Sr. Full-stack Eng" />
                       <MiniField label="Location" value="San Francisco, CA" />
                    </div>
                 </ProfileSectionBlock>

                 <ProfileSectionBlock title="Work Experience" type="cream" isVisible={true} count={4} onEdit={() => setIsDrawerOpen(true)}>
                    <div className="flex items-center gap-3 p-1">
                        <MiniBlock />
                        <MiniBlock />
                        <MiniBlock />
                        <span className="font-mono text-xs font-bold text-folio-dark/30 ml-2 uppercase">+1 Past Role</span>
                    </div>
                 </ProfileSectionBlock>

                 <ProfileSectionBlock title="Education & Credentials" type="cream" isVisible={true} count={2}>
                    <div className="pl-5 border-l-4 border-folio-green-deep/10 py-1 ml-2">
                       <p className="text-base font-bold text-folio-dark">Stanford University</p>
                       <p className="font-mono text-[10px] text-folio-red font-bold uppercase tracking-widest mt-1">MSc Computer Science</p>
                    </div>
                 </ProfileSectionBlock>

                 <ProfileSectionBlock title="Technical Skills" type="dark" isVisible={false} count={12}>
                    <div className="flex flex-wrap gap-2">
                       <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px]">React</span>
                       <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px]">Node.js</span>
                       <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] opacity-50">...</span>
                    </div>
                 </ProfileSectionBlock>

                 <ProfileSectionBlock title="Projects & Case Studies" type="dark" isVisible={true} count={0} onEdit={() => setIsDrawerOpen(true)}>
                    <div className="w-full flex justify-between items-center bg-white/5 border border-dashed border-white/20 rounded-lg p-5 group-hover:border-white/40 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-folio-cream/50">
                             <FolderPlus size={18} />
                          </div>
                          <div>
                             <p className="font-sans text-sm font-bold text-folio-cream leading-tight">No projects attached</p>
                             <p className="font-mono text-[10px] text-folio-cream/50 mt-1 uppercase tracking-widest">[ Array Empty ]</p>
                          </div>
                       </div>
                       <button onClick={() => setIsDrawerOpen(true)} className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-2 border border-white/20 rounded hover:bg-white hover:text-folio-bg transition-colors">
                          Insert Data
                       </button>
                    </div>
                 </ProfileSectionBlock>

                 <ProfileSectionBlock title="Spoken Languages" type="cream" isVisible={true} count={0} onEdit={() => setIsDrawerOpen(true)}>
                    <div className="p-4 border border-dashed border-folio-dark/20 rounded-xl flex flex-col items-center justify-center text-center gap-3 bg-folio-dark/5 py-8 opacity-80 group-hover:opacity-100 transition-opacity">
                       <Globe size={24} className="text-folio-dark/30 mb-1" />
                       <p className="font-sans text-sm text-folio-dark/80 font-medium">Add languages to boost your global reach.</p>
                       <button className="font-mono text-[10px] font-bold px-4 py-2 border border-folio-dark/20 text-folio-dark rounded uppercase tracking-widest hover:bg-folio-dark hover:text-folio-cream transition-colors mt-2">
                          + Configure Language
                       </button>
                    </div>
                 </ProfileSectionBlock>

                 {/* Add Section Ghost Button */}
                 <button className="w-full flex items-center justify-center gap-3 p-6 border-2 border-dashed border-white/10 rounded-folio-xl hover:border-folio-cream hover:bg-white/5 transition-all text-folio-cream/50 hover:text-folio-cream group">
                    <Plus className="group-hover:scale-110 transition-transform" />
                    <span className="font-display font-bold text-xl tracking-tight">Add New Module</span>
                 </button>

              </div>
           </div>

           {/* Right Column: Output Preview Tracking */}
           <div className="lg:col-span-4 sticky top-6">
              
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-mono text-[10px] text-folio-cream/50 uppercase tracking-widest">
                   Live Output Preview
                 </h3>
                 <div className="flex gap-2">
                    <Smartphone size={14} className="text-folio-cream/30 hover:text-folio-cream cursor-pointer" />
                    <Layout size={14} className="text-folio-cream" />
                 </div>
              </div>

              {/* The "Generated Paper/Web" feel */}
              <div className="bg-folio-cream rounded-t-[2.5rem] rounded-b-3xl p-10 min-h-[500px] text-folio-dark shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-folio-red via-folio-green-deep to-folio-green-light" />
                 
                 {/* Preview Wireframe content */}
                 <div className="flex flex-col gap-6 mt-4">
                    {/* Header preview */}
                    <div className="border-b border-folio-dark/10 pb-4">
                       <div className="w-16 h-16 rounded-full bg-folio-dark/5 mb-3" />
                       <div className="h-6 w-3/4 bg-folio-dark border border-folio-dark/20 rounded mb-2" />
                       <div className="h-3 w-1/2 bg-folio-dark/20 rounded" />
                    </div>
                    
                    {/* Experiences preview */}
                    <div className="flex flex-col gap-3">
                       <div className="h-3 w-1/3 bg-folio-green-deep/80 rounded mb-1" />
                       <div className="p-3 border border-folio-dark/10 rounded-lg">
                          <div className="h-4 w-1/2 bg-folio-dark/80 rounded mb-2" />
                          <div className="h-2 w-1/4 bg-folio-dark/30 rounded mb-4" />
                          <div className="h-2 w-full bg-folio-dark/10 rounded mb-1" />
                          <div className="h-2 w-5/6 bg-folio-dark/10 rounded" />
                       </div>
                       <div className="p-3 border border-folio-dark/10 rounded-lg">
                          <div className="h-4 w-2/5 bg-folio-dark/80 rounded mb-2" />
                          <div className="h-2 w-1/4 bg-folio-dark/30 rounded" />
                       </div>
                    </div>
                 </div>

                 {/* Focus visualizer */}
                 <div className="absolute inset-0 bg-folio-dark/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="btn-primary shadow-xl">Full Preview</button>
                 </div>
              </div>
              
              <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5 flex gap-4 items-center">
                 <Network className="text-folio-cream/40" />
                 <div>
                    <h4 className="text-sm font-bold text-folio-cream">1 Primary, 3 Custom</h4>
                    <p className="text-[10px] font-mono text-folio-cream/50">Outputs synced instantly.</p>
                 </div>
              </div>

           </div>

        </div>
      )}

      {/* Versions Empty State */}
      {activeNav === 'versions' && (
         <div className="flex flex-col items-center justify-center h-[75vh] border border-dashed border-white/10 rounded-folio-xl relative overflow-hidden bg-folio-bg group mt-4">
            {/* Technical Blueprint Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none" />

            <div className="bg-white/5 p-4 rounded-2xl mb-8 text-folio-green-light border border-white/10 relative z-10 backdrop-blur-sm shadow-xl">
               <BoxSelect size={32} />
            </div>
            
            <h2 className="text-tight-display text-5xl md:text-6xl text-folio-cream mb-4 relative z-10 text-center tracking-tighter">
               Format <span className="font-editorial italic font-normal text-folio-red">Unallocated</span>
            </h2>
            
            <p className="font-sans text-folio-cream/60 max-w-md text-center leading-relaxed mb-8 relative z-10 font-medium">
               Your Master Profile is gathering data, but you haven't spawned any specialized outputs yet. Create a tailored resume, portfolio, or API endpoint.
            </p>
            
            <button className="flex items-center gap-3 px-6 py-4 bg-folio-green-light text-folio-green-deep font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-transform relative z-10 overflow-hidden group/btn">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
               <Sparkles size={18} className="relative z-10" />
               <span className="relative z-10 tracking-tight">Generate New Context</span>
            </button>

            <div className="mt-12 font-mono text-[10px] text-folio-cream/30 uppercase tracking-widest relative z-10 flex flex-col items-center gap-2">
               <span>[ AWAITING INSTRUCTION ]</span>
               <div className="w-px h-8 bg-white/20 animate-pulse" />
            </div>
         </div>
      )}

      {/* Side Drawer Overlay (Data Entry Panel) */}
      <AnimatePresence>
        {isDrawerOpen && (
           <div className="fixed inset-0 z-[200] flex justify-end">
              {/* Backdrop */}
              <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }} 
                 onClick={() => setIsDrawerOpen(false)}
                 className="absolute inset-0 bg-folio-bg/80 backdrop-blur-sm cursor-pointer" 
              />
              
              {/* Drawer Sheet */}
              <motion.div 
                 initial={{ x: '100%' }}
                 animate={{ x: 0 }}
                 exit={{ x: '100%' }}
                 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                 className="relative w-full md:w-[600px] h-full bg-folio-cream shadow-2xl border-l border-folio-dark/10 flex flex-col"
              >
                 {/* Drawer Header */}
                 <div className="px-8 flex items-center justify-between border-b border-folio-dark/10 h-[88px] shrink-0">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-6 bg-folio-red skew-x-[-15deg] rounded-sm" />
                       <h2 className="text-tight-display text-4xl text-folio-dark tracking-tighter mt-1">Edit Experience</h2>
                    </div>
                    <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-folio-dark/5 hover:bg-folio-dark/10 rounded-full text-folio-dark/50 transition-colors">
                       <X size={20} />
                    </button>
                 </div>

                 {/* Drawer Body (Form) */}
                 <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 text-folio-dark">
                    <div className="bg-folio-green-light/10 border border-folio-green-light/30 px-4 py-3 rounded-xl flex items-center gap-3 text-sm text-folio-green-deep font-bold mb-2 shadow-sm">
                       <CheckCircle2 size={16} /> Data syncs automatically to 4 outputs.
                    </div>

                    <div className="flex flex-col gap-1 w-full relative">
                       <label className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/50 font-bold">Company Name</label>
                       <input 
                          className="bg-transparent border-b-2 border-folio-dark/20 py-2 font-bold font-sans text-xl focus:outline-none focus:border-folio-red transition-colors placeholder:text-folio-dark/20" 
                          placeholder="e.g. Acme Studio" 
                          defaultValue="Google Sandbox"
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="flex flex-col gap-1 w-full relative">
                          <label className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/50 font-bold">Start Date</label>
                          <div className="flex items-center gap-2 border-b-2 border-folio-dark/20 py-2 focus-within:border-folio-red transition-colors">
                             <Calendar size={16} className="text-folio-dark/40" />
                             <input className="bg-transparent font-bold font-mono text-sm focus:outline-none w-full" placeholder="YYYY-MM" defaultValue="2022-04" />
                          </div>
                       </div>
                       <div className="flex flex-col gap-1 w-full relative">
                          <label className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/50 font-bold">End Date</label>
                          <div className="flex items-center gap-2 border-b-2 border-folio-dark/20 py-2 focus-within:border-folio-red transition-colors">
                             <input className="bg-transparent font-bold font-mono text-sm text-folio-green-deep focus:outline-none w-full" placeholder="YYYY-MM" defaultValue="Present" />
                          </div>
                          <span className="font-mono text-[9px] text-folio-green-deep absolute right-0 bottom-2 bg-folio-green-light/30 px-2 py-0.5 rounded">Active</span>
                       </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full relative">
                       <label className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/50 font-bold mb-2">Job Description (Markdown)</label>
                       <textarea 
                          className="bg-folio-dark/5 border border-folio-dark/10 rounded-xl p-4 font-medium font-sans text-sm min-h-[160px] focus:outline-none focus:border-folio-green-deep focus:bg-transparent resize-none transition-colors leading-relaxed" 
                          placeholder="Describe your impact..."
                          defaultValue="Built a revolutionary real-time interface using React & Vite.&#10;&#10;Led a team of independent developers to scale the solution to 4 million concurrent users."
                       />
                    </div>

                    <div>
                       <label className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/50 font-bold mb-3 block">Taxonomy Tags</label>
                       <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1.5 bg-folio-green-deep/5 text-folio-green-deep border border-folio-green-deep/20 rounded font-mono text-[10px] font-bold">React</span>
                          <span className="px-3 py-1.5 bg-folio-green-deep/5 text-folio-green-deep border border-folio-green-deep/20 rounded font-mono text-[10px] font-bold">Vite</span>
                          <span className="px-3 py-1.5 bg-folio-green-deep/5 text-folio-green-deep border border-folio-green-deep/20 rounded font-mono text-[10px] font-bold flex items-center gap-2 hover:bg-folio-red/10 hover:text-folio-red hover:border-folio-red/20 transition-colors cursor-pointer group">
                             TypeScript <X size={10} className="group-hover:scale-125 transition-transform" />
                          </span>
                          <span className="px-3 py-1.5 bg-folio-dark/5 text-folio-dark/40 border border-folio-dark/10 border-dashed rounded font-mono text-[10px] cursor-pointer hover:text-folio-dark hover:border-folio-dark/30">+ Add Skill</span>
                       </div>
                    </div>

                 </div>

                 {/* Drawer Footer */}
                 <div className="p-8 border-t border-folio-dark/10 flex justify-end gap-3 bg-folio-cream shrink-0">
                    <button onClick={() => setIsDrawerOpen(false)} className="px-6 py-3 font-bold text-folio-dark hover:bg-folio-dark/5 rounded-full transition-colors">Cancel</button>
                    <button onClick={() => setIsDrawerOpen(false)} className="btn-primary">Save Module</button>
                 </div>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileSectionBlock({ title, type, isVisible, count, isFixed, onEdit, children }: { title: string, type: 'cream'|'green'|'dark', isVisible: boolean, count?: number, isFixed?: boolean, onEdit?: () => void, children: React.ReactNode }) {
   
   // Style mapping based on type
   const baseClass = "rounded-folio-xl flex transition-transform overflow-hidden " + (!isVisible ? "opacity-60 grayscale" : "");
   const bgClass = 
      type === 'cream' ? 'bg-folio-cream text-folio-dark shadow-sm' :
      type === 'green' ? 'bg-folio-green-deep text-folio-cream' :
      'bg-folio-bg border border-white/10 text-folio-cream';
   
   const handleColor = 
      type === 'cream' ? 'hover:bg-folio-dark/5 text-folio-dark/30 hover:text-folio-dark' :
      type === 'green' ? 'hover:bg-black/10 text-folio-cream/30 hover:text-folio-cream' :
      'hover:bg-white/5 text-folio-cream/20 hover:text-folio-cream/60';

   return (
      <div className={`${baseClass} ${bgClass}`}>
         {/* Grip Handle Panel */}
         <div className={`w-10 flex flex-col items-center justify-center shrink-0 cursor-grab active:cursor-grabbing border-r ${type==='cream'?'border-folio-dark/10':'border-white/10'} ${handleColor}`}>
            {!isFixed && <GripVertical size={16} />}
            {isFixed && <div className="w-1 h-8 rounded-full bg-current opacity-20" />}
         </div>
         
         {/* Main Content Area */}
         <div className="p-8 md:p-10 flex-1 flex flex-col justify-between group">
            
            <div className="flex justify-between items-start mb-8">
               <div className="flex items-center gap-3">
                  <h3 className="font-display font-bold text-2xl tracking-tight">{title}</h3>
                  {count !== undefined && (
                     <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md ${type==='cream'?'bg-folio-green-deep/10 text-folio-green-deep':'bg-black/20 text-folio-cream/80'}`}>
                        {count} items
                     </span>
                  )}
               </div>
               
               {/* Controls */}
               <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button className={`p-1.5 rounded-lg transition-colors ${type==='cream'?'hover:bg-folio-dark/10':'hover:bg-white/10'}`}>
                     {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={onEdit} className={`p-1.5 rounded-lg transition-colors ${type==='cream'?'hover:bg-folio-dark/10':'hover:bg-white/10'}`}>
                     <Edit3 size={16} />
                  </button>
               </div>
            </div>

            {/* Injected Content (Mini blocks, fields, etc) */}
            <div className="mt-2">
               {children}
            </div>
         </div>
      </div>
   )
}

function MiniField({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex flex-col gap-1">
         <span className="font-mono text-[9px] uppercase tracking-widest opacity-50">{label}</span>
         <span className="font-sans font-bold text-sm tracking-tight truncate">{value}</span>
      </div>
   )
}

function MiniBlock() {
   return (
      <div className="w-10 h-10 bg-folio-green-deep rounded-lg flex items-center justify-center border-2 border-folio-cream shadow-sm shrink-0">
         <div className="w-4 h-4 rounded-sm bg-folio-green-light" />
      </div>
   )
}
// -----------------------------------------------------------------------------
function ScaleRow({ role, font, example, allowColors, disallowColors, usage, sampleClass }: { role: string, font: string, example: string, allowColors: string, disallowColors: string, usage: string, sampleClass: string }) {
   return (
      <div className="flex flex-col md:flex-row gap-6 p-6 border-b border-white/10 hover:bg-white/5 transition-colors">
         <div className="md:w-1/3 shrink-0">
            <div className="font-mono text-[10px] text-folio-green-light uppercase tracking-widest mb-1">{role}</div>
            <div className="font-mono text-xs text-folio-cream/60 mb-4">{font}</div>
            <div className="text-xs text-folio-cream/80 font-sans leading-relaxed">
               <strong>Use for:</strong> {usage}
            </div>
         </div>
         <div className="md:w-1/3 flex items-center shrink-0">
            <div className={`${sampleClass} text-folio-cream`}>{example}</div>
         </div>
         <div className="md:w-1/3 flex flex-col gap-3 justify-center text-xs font-sans">
            <div className="flex items-start gap-2 text-folio-cream/80">
               <CheckCircle size={14} className="text-folio-green-light shrink-0 mt-0.5" />
               <span><strong>Allowed:</strong> {allowColors}</span>
            </div>
            <div className="flex items-start gap-2 text-folio-red/80">
               <XCircle size={14} className="shrink-0 mt-0.5" />
               <span><strong>Avoid:</strong> {disallowColors}</span>
            </div>
         </div>
      </div>
   )
}

function TypographyView() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto space-y-24">
      {/* Intro */}
      <div>
         <h2 className="text-tight-display text-4xl text-folio-cream mb-4">Typography & Color System</h2>
         <p className="font-mono text-folio-cream/60 text-sm">Strict rules for structural hierarchy and contrast within the FolioTree aesthetic.</p>
      </div>

      {/* The Hierarchical Scale */}
      <section>
         <h3 className="font-mono text-xs text-folio-cream/40 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">1. Typographic Scale</h3>
         <div className="bg-folio-dark/30 rounded-folio-xl border border-white/10 overflow-hidden">
             <ScaleRow 
                role="H1 / Hero Display" 
                font="DM Sans, Bold, Tighter Tracking" 
                example="Master Profile"
                allowColors="Cream, Folio Dark, Green Deep"
                disallowColors="Green Light as primary text."
                usage="Landing page heroes, major section headers. Use sparingly."
                sampleClass="text-tight-display text-4xl"
             />
             <ScaleRow
                role="H2 / Editorial Sub" 
                font="Playfair Display, Italic" 
                example="A record of excellence."
                allowColors="Folio Red, Folio Cream"
                disallowColors="Folio Dark on dark backgrounds."
                usage="Sub-headers, stylistic highlights, personal statements."
                sampleClass="font-editorial italic text-3xl"
             />
             <ScaleRow 
                role="H3 / Bento Titles" 
                font="DM Sans, Bold" 
                example="Experience Data"
                allowColors="Folio Cream, Folio Dark"
                disallowColors="Folio Red for structural block titles."
                usage="Titles of cards, drawer panels, modal headers."
                sampleClass="font-display font-bold text-2xl tracking-tight"
             />
             <ScaleRow 
                role="Body / UI Text" 
                font="Inter, Medium/Regular" 
                example="Update your records here to sync all platforms."
                allowColors="Cream/80 (on Dark), Folio Dark (on Cream)."
                disallowColors="Fully saturated colors (Red/Green Light) for long reading."
                usage="Paragraphs, descriptions, UI standard text."
                sampleClass="font-sans font-medium text-sm leading-relaxed"
             />
             <ScaleRow 
                role="Meta / Data Node" 
                font="JetBrains Mono, 10px, Uppercase" 
                example="SYNC: ACTIVE"
                allowColors="Green Light, Dark/50, Cream/50."
                disallowColors="Standard readable copy or sentences."
                usage="Labels, taxonomy tags, exact data points."
                sampleClass="font-mono text-[10px] uppercase tracking-widest"
             />
         </div>
      </section>

      {/* Color Usage & Contrast Rules */}
      <section>
         <h3 className="font-mono text-xs text-folio-cream/40 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">2. Applications & Contrast (The Sandwich Principle)</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* DO block: Folio Dark on Cream */}
            <div className="bento-card-cream p-8 flex flex-col justify-between min-h-[280px]">
               <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-folio-green-deep tracking-widest font-bold mb-6">
                     <CheckCircle size={14} /> DO: Core Contrast
                  </div>
                  <h3 className="text-tight-display text-4xl text-folio-dark mb-4 drop-shadow-sm">High Legibility</h3>
                  <p className="font-sans text-sm text-folio-dark/70 leading-relaxed font-medium">Use <span className="font-bold text-folio-dark">Folio Dark</span> text on <span className="font-bold text-folio-dark">Folio Cream</span> background. This is the primary mode for data entry and heavy reading. Red is reserved strictly for editorial accents.</p>
               </div>
               <div className="font-editorial italic text-folio-red text-xl mt-6 border-t border-folio-dark/10 pt-4">Legibility meets elegance.</div>
            </div>

            {/* DONT block: Low Contrast Red on Green */}
            <div className="bento-card bg-folio-green-deep border-4 border-red-500/20 p-8 flex flex-col justify-between min-h-[280px] grayscale-[0.2]">
               <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-red-300 tracking-widest font-bold mb-6">
                     <XCircle size={14} /> DON'T: Color Clashing
                  </div>
                  <h3 className="text-tight-display text-4xl text-folio-red mb-4">Visual Strain</h3>
                  <p className="font-sans text-sm text-folio-red leading-relaxed font-medium">Never place <span className="font-bold">Folio Red</span> text directly on <span className="font-bold">Folio Green Deep</span>. They vibrate and destroy legibility. Use Cream or Green Light instead.</p>
               </div>
               <div className="font-mono text-xs text-folio-red uppercase tracking-widest border border-folio-red p-2 inline-block mt-4 opacity-50">Cannot Read Meta</div>
            </div>

            {/* DO block: Green Light on Deep */}
            <div className="bento-card-green p-8 flex flex-col justify-between min-h-[280px] ring-1 ring-white/10 ring-inset">
               <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-folio-green-light tracking-widest font-bold mb-6">
                     <CheckCircle size={14} /> DO: Tonal Depth
                  </div>
                  <h3 className="text-tight-display text-4xl text-folio-cream mb-4">Safe Sandbox</h3>
                  <p className="font-sans text-sm text-folio-cream/80 leading-relaxed font-medium">Use <span className="font-bold text-folio-cream">Folio Cream</span> for the primary body inside dark panels, and <span className="font-bold text-folio-green-light">Folio Green Light</span> strictly used for mono labels and micro-interactions to create depth without straining the eye.</p>
               </div>
               <div className="mt-6 flex gap-2">
                  <div className="font-mono text-[10px] text-folio-green-light uppercase tracking-widest bg-folio-green-light/10 inline-block px-3 py-1.5 rounded w-max">Approved Tag</div>
                  <div className="font-mono text-[10px] text-folio-green-light uppercase tracking-widest border border-folio-green-light/20 inline-block px-3 py-1.5 rounded w-max">Secondary</div>
               </div>
            </div>

            {/* DONT block: Folio Dark on Folio BG */}
            <div className="bento-card bg-folio-bg border-4 border-red-500/20 p-8 flex flex-col justify-between min-h-[280px]">
               <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-red-500 tracking-widest font-bold mb-6">
                     <XCircle size={14} /> DON'T: Lost Hierarchy
                  </div>
                  <h3 className="text-tight-display text-4xl text-folio-dark mb-4">Invisible Ink</h3>
                  <p className="font-sans text-sm text-folio-dark leading-relaxed font-medium">Applying <span className="font-bold">Folio Dark</span> typography on <span className="font-bold text-white">Folio BG (Dark Grey)</span> is strictly forbidden. The Sandwich Principle dictates this outer layer must carry Cream or White/Opacity text.</p>
               </div>
               <div className="font-sans font-bold text-folio-dark border-t border-white/5 pt-4 mt-6">This text is completely lost in the background.</div>
            </div>

         </div>
      </section>

    </div>
  )
}


// -----------------------------------------------------------------------------
// PUBLIC OUTPUT CONCEPT (Linktree Style)
// -----------------------------------------------------------------------------
function PublicOutputConcept() {
   return (
      <div className="min-h-screen bg-[#F9F7F2] font-sans flex justify-center py-12 md:py-20 px-4">
         <div className="w-full max-w-md flex flex-col items-center gap-8">
            
            {/* Header: Photo & Name */}
            <div className="flex flex-col items-center gap-4 text-center">
               <div className="w-24 h-24 rounded-full bg-folio-dark/5 border border-folio-dark/10 p-1 shadow-sm">
                  <div className="w-full h-full rounded-full bg-folio-green-deep flex overflow-hidden">
                     {/* Abstract portrait placeholder */}
                     <div className="w-full h-full bg-folio-red/20 translate-y-4 rounded-full" />
                  </div>
               </div>
               <div>
                  <h1 className="text-tight-display text-4xl text-folio-dark mb-1">Jane Doe</h1>
                  <p className="font-editorial italic text-folio-red text-xl">Product Designer & Developer</p>
               </div>
               <div className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/40 flex items-center gap-2 bg-folio-dark/5 px-4 py-2 rounded-full mt-2">
                  <Globe size={12} /> Available for freelance
               </div>
            </div>

            {/* Links / Content Blocks */}
            <div className="w-full flex flex-col gap-4 mt-4">
               {/* Primary Highlight Link */}
               <a href="#" className="w-full p-6 border-2 border-folio-dark rounded-folio-xl bg-folio-cream hover:bg-folio-dark hover:text-folio-cream transition-colors group relative overflow-hidden flex flex-col items-center text-center gap-2 shadow-sm">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-folio-red rounded-bl-full -mr-8 -mt-8 opacity-20 group-hover:scale-150 transition-transform duration-500" />
                  <span className="font-display font-bold text-2xl tracking-tighter relative z-10 group-hover:text-folio-cream transition-colors">Complete Portfolio</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 relative z-10 group-hover:text-folio-cream/70 transition-colors">View latest case studies +</span>
               </a>

               <a href="#" className="w-full p-5 border border-folio-dark/10 rounded-folio-xl bg-white hover:border-folio-dark/30 hover:shadow-lg transition-all flex items-center justify-between group shadow-sm">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-folio-green-deep/5 border border-folio-green-deep/10 text-folio-green-deep flex items-center justify-center group-hover:bg-folio-green-deep group-hover:text-folio-cream transition-colors">
                        <Briefcase size={18} />
                     </div>
                     <span className="font-bold text-folio-dark text-lg tracking-tight">Download Resume (PDF)</span>
                  </div>
                  <ArrowUpRight className="text-folio-dark/30 group-hover:text-folio-dark transition-colors" />
               </a>

               <a href="#" className="w-full p-5 border border-folio-dark/10 rounded-folio-xl bg-white hover:border-folio-dark/30 hover:shadow-lg transition-all flex items-center justify-between group shadow-sm">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-folio-red/5 border border-folio-red/10 text-folio-red flex items-center justify-center group-hover:bg-folio-red group-hover:text-folio-cream transition-colors">
                        <Palette size={18} />
                     </div>
                     <span className="font-bold text-folio-dark text-lg tracking-tight">Dribbble Feed</span>
                  </div>
                  <ArrowUpRight className="text-folio-dark/30 group-hover:text-folio-dark transition-colors" />
               </a>

               {/* Experience Extract (Data driven block) */}
               <div className="w-full p-6 border-2 border-dashed border-folio-dark/10 rounded-folio-xl bg-transparent mt-4 flex flex-col gap-4 text-left group hover:border-folio-dark/20 transition-colors">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-folio-dark/40 font-bold mb-2 flex items-center gap-2 group-hover:text-folio-green-deep transition-colors">
                     <Database size={12} /> Live Sync Data
                  </div>
                  <div className="flex justify-between items-start">
                     <div>
                        <h4 className="font-bold text-lg text-folio-dark tracking-tight">Design System Lead</h4>
                        <p className="text-folio-dark/60 text-sm font-medium">Google Sandbox</p>
                     </div>
                     <span className="font-mono text-[10px] font-bold bg-folio-green-deep/5 border border-folio-green-deep/10 text-folio-green-deep px-2 py-1 rounded">2022 - Present</span>
                  </div>
               </div>

            </div>

            {/* Footer Badge */}
            <div className="mt-12 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-folio-dark/30 hover:opacity-100 transition-opacity cursor-pointer">
               <Layers size={14} /> Powered by <span className="font-bold text-folio-green-deep">FolioTree</span>
            </div>

         </div>
      </div>
   )
}
