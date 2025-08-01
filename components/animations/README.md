# Unified Animation System

## Overview

This is a **clean, organized animation system** that handles all section transitions in your portfolio. Instead of having 7 separate files with confusing logic, everything is now in **one organized file**.

## How It Works

### 1. **Single File Structure**
- **Before**: 7 separate files (`heroAnimations.ts`, `aboutAnimations.ts`, `workAnimations.ts`, etc.)
- **After**: 1 unified file (`unifiedAnimations.ts`)

### 2. **Consistent Animation Pattern**
Every section follows the **same animation pattern**:

```
Section Transition = Exit Current Section + Enter Target Section
```

#### Exit Animation (for all sections):
1. **Content elements** animate out (fade, move, scale)
2. **Section container** fades out

#### Enter Animation (for all sections):
1. **Section container** fades in
2. **Content elements** reset to initial state
3. **Content elements** animate in with stagger

### 3. **Configuration Object**
All timing and easing is controlled by one config object:

```typescript
const ANIMATION_CONFIG = {
  sectionFadeDuration: 1.5,      // How long sections fade
  contentAnimationDuration: 1.2, // How long content animates
  staggerDelay: 0.15,           // Delay between staggered elements
  sectionEase: "power2.inOut",   // Easing for sections
  contentEase: "power2.out",     // Easing for content
}
```

## File Structure

```
components/animations/
├── unifiedAnimations.ts    ← NEW: Everything in one place
├── README.md              ← This file
└── [old files can be deleted]
```

## Usage

### In your component:

```typescript
import { createUnifiedAnimations, SectionElements } from './unifiedAnimations';

// 1. Define your elements
const elements: SectionElements = {
  heroRef: heroRef.current,
  aboutRef: aboutRef.current,
  workRef: workRef.current,
  // ... other elements
};

// 2. Create animation system
const { navigateToSection, initializeAnimations } = createUnifiedAnimations(elements);

// 3. Use it
navigateToSection(currentSection, targetSection, () => {
  console.log('Animation complete!');
});
```

## Benefits

✅ **Easy to understand** - All logic in one place  
✅ **Consistent animations** - Same pattern for all sections  
✅ **Easy to modify** - Change timing in one config object  
✅ **No confusion** - Clear, organized code structure  
✅ **Maintainable** - Easy to add new sections or modify existing ones  

## Adding a New Section

To add a new section (e.g., "Contact"):

1. **Add to types**:
```typescript
export interface SectionElements {
  // ... existing elements
  contactRef: HTMLElement | null;
  contactTitle: Element | null;
  contactForm: Element | null;
}
```

2. **Add to animation methods**:
```typescript
private exitContact(tl: gsap.core.Timeline) {
  // Exit animation logic
}

private enterContact(tl: gsap.core.Timeline) {
  // Enter animation logic
}
```

3. **Add to switch statements**:
```typescript
case 3:
  this.exitContact(tl);
  break;
```

That's it! Much simpler than the old system. 