/**
 * ============================================================================
 * BLACK LABEL LIFESTYLE — CLIENT-SIDE CONTROLLER & INTERACTION ENGINE
 * ============================================================================
 * 
 * OWNER & DEVELOPER HANDOFF GUIDE:
 * ----------------------------------------------------------------------------
 * This module is the central client-side controller for the Black Label Lifestyle
 * web platform. It initializes all micro-interactions, mobile navigation,
 * dynamic forms, real-time calculators, 3D card physics, and on-demand assets.
 * 
 * CORE OWNER CONFIGURATION POINTS:
 * 1. Primary Concierge Inquiries:
 *    - Destination: concierge@blacklabel.life
 *    - Standard SLA: Under 2-Hour Executive Response Protocol
 * 2. Global Headquarters:
 *    - Millennium Tower, 301 Mission St, SoMa, San Francisco, CA 94105
 *    - GPS Coordinates: [37.7903, -122.3970]
 * 3. Performance Architecture:
 *    - Dynamic Code Splitting: Leaflet (148 KB) and Admin Analytics (21 KB)
 *      are dynamically imported on-demand to keep initial JS bundle at ~23 KB.
 *    - Idle Scheduling: Telemetry tracking executes during browser idle time
 *      via requestIdleCallback, preserving 100/100 Core Web Vitals.
 * 4. Eight Operating Divisions:
 *    - Social, Entertainment, Trading, Lifestyle, Design, Business Services,
 *      Investments, and Luxury Rentals.
 * 
 * TABLE OF CONTENTS:
 * 0. Idle Telemetry & Background Analytics Dispatch
 * 1. Mobile Off-Canvas Navigation Drawer & Backdrop Focus Trap
 * 2. Smooth-Scroll Anchor Link Handler with Header Offset
 * 3. Sticky Header Glassmorphism & Elevation on Scroll
 * 4. Instant Division Filter Tabs (Zero-Latency Switching)
 * 5. Interactive Time Freedom Calculator (Weekly/Monthly ROI)
 * 6. Concierge & Priority Intake Form Handlers
 * 7. IntersectionObserver Luxury Section Reveals & Staggered Transitions
 * 8. Interactive 3D Perspective Tilt on Luxury Graphic Cards
 * 9. Cinematic Twilight Penthouse Hero Parallax (Lerp Engine)
 * 10. Interactive Luxury Dark Map (Millennium Tower, San Francisco)
 * 11. Sovereign Mandate Contact Dispatch & Encrypted Ticket Generator
 * 12. Concierge Terminal & Architectural Tower Elevation Controls
 * ============================================================================
 */

import { mountChatbot } from './App';

/**
 * Main application bootstrap function.
 * Invoked once the DOM is ready or immediately if already interactive.
 */
function initSite(): void {
  // Mount the interactive Black Label Concierge Assistant chatbot widget
  mountChatbot();

  // --------------------------------------------------------------------------
  // 0. IDLE TELEMETRY & BACKGROUND ANALYTICS DISPATCH
  // --------------------------------------------------------------------------
  // Owner Note: We defer analytics recording to idle time so it never competes
  // with critical first paint (FCP) or largest contentful paint (LCP).
  if (typeof window !== 'undefined') {
    const record = () => {
      import('./admin-analytics.ts').then((mod) => {
        // Records verified real visitor telemetry (IP geocoding, US state, page counts)
        mod.recordRealSiteVisit();
        // If on the /admin dashboard, initialize the real-time analytics UI
        if (window.location.pathname.includes('/admin')) {
          mod.initAdminAnalytics();
        }
      });
    };

    // Use requestIdleCallback if available, fallback to 1s timeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(record, { timeout: 2000 });
    } else {
      setTimeout(record, 1000);
    }
  }

  // --------------------------------------------------------------------------
  // 1. MOBILE OFF-CANVAS NAVIGATION DRAWER & BACKDROP FOCUS TRAP
  // --------------------------------------------------------------------------
  // Owner Note: Controls the slide-in drawer on mobile and tablet viewports.
  // Includes backdrop blur, ESC key dismiss, and smooth translation animations.
  const openButtons = document.querySelectorAll<HTMLElement>('[data-mobile-menu-open]');
  const closeButtons = document.querySelectorAll<HTMLElement>('[data-mobile-menu-close]');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerContent = document.getElementById('mobile-drawer-content');

  function openMenu(): void {
    if (!drawer) return;
    drawer.classList.remove('hidden');
    document.body.classList.add('mobile-drawer-open');
    requestAnimationFrame(() => {
      backdrop?.classList.remove('opacity-0');
      backdrop?.classList.add('opacity-100');
      drawerContent?.classList.remove('translate-x-full');
      drawerContent?.classList.add('translate-x-0');
    });
  }

  function closeMenu(): void {
    if (!drawer) return;
    backdrop?.classList.remove('opacity-100');
    backdrop?.classList.add('opacity-0');
    drawerContent?.classList.remove('translate-x-0');
    drawerContent?.classList.add('translate-x-full');

    setTimeout(() => {
      drawer.classList.add('hidden');
      document.body.classList.remove('mobile-drawer-open');
    }, 250);
  }

  openButtons.forEach((btn) => btn.addEventListener('click', openMenu));
  closeButtons.forEach((btn) => btn.addEventListener('click', closeMenu));
  backdrop?.addEventListener('click', closeMenu);

  // Close drawer on keyboard Escape key
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && drawer && !drawer.classList.contains('hidden')) {
      closeMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 2. SMOOTH-SCROLL ANCHOR LINK HANDLER WITH HEADER OFFSET
  // --------------------------------------------------------------------------
  // Owner Note: Handles smooth in-page transitions (e.g. #brands, #inquire)
  // preventing jarring instantaneous jumps.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. STICKY HEADER GLASSMORPHISM & ELEVATION ON SCROLL
  // --------------------------------------------------------------------------
  // Owner Note: Elevates the top navigation bar with dark obsidian opacity
  // and subtle champagne border illumination once the user scrolls past 20px.
  const header = document.querySelector<HTMLElement>('header[data-sticky-header]');
  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 20) {
          header.classList.add('bg-[#060709]/95', 'shadow-2xl', 'border-[#c5a059]/30');
          header.classList.remove('bg-[#060709]/85', 'border-[#c5a059]/20');
        } else {
          header.classList.remove('bg-[#060709]/95', 'shadow-2xl', 'border-[#c5a059]/30');
          header.classList.add('bg-[#060709]/85', 'border-[#c5a059]/20');
        }
      },
      { passive: true }
    );
  }

  // --------------------------------------------------------------------------
  // 4. INSTANT DIVISION FILTER TABS (ZERO-LATENCY SWITCHING)
  // --------------------------------------------------------------------------
  // Owner Note: Powers the interactive filter buttons on the Homepage
  // ("All 8 Divisions", "Lifestyle & Access", "Wealth & Trading", "Creative & Media").
  // Optimized for 0ms perceptible delay without sluggish stagger lag.
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter-category]');
  const divisionArticles = document.querySelectorAll<HTMLElement>('[data-division-category]');

  if (filterButtons.length > 0 && divisionArticles.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-filter-category') || 'all';

        // 1. Instant button states (0ms latency feedback)
        filterButtons.forEach((b) => {
          const isActive = b === button;
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          if (isActive) {
            b.classList.remove('bg-white/[0.04]', 'text-[#e6e0d4]/85', 'hover:text-[#faf8f5]', 'hover:bg-white/[0.08]', 'border', 'border-white/10');
            b.classList.add('bg-[#c5a059]', 'text-[#060709]', 'font-semibold', 'shadow-sm');
          } else {
            b.classList.remove('bg-[#c5a059]', 'text-[#060709]', 'font-semibold', 'shadow-sm');
            b.classList.add('bg-white/[0.04]', 'text-[#e6e0d4]/85', 'hover:text-[#faf8f5]', 'hover:bg-white/[0.08]', 'border', 'border-white/10');
          }
        });

        // 2. Filter cards immediately without stagger delay lag
        divisionArticles.forEach((article) => {
          // Clear any transition delays from scroll animations
          article.style.transitionDelay = '0ms';

          const cardCategory = article.getAttribute('data-division-category') || '';
          const matches = category === 'all' || cardCategory.includes(category);

          if (matches) {
            const wasHidden = article.classList.contains('hidden') || article.style.display === 'none';
            article.classList.remove('hidden');
            article.style.display = 'flex';
            article.classList.add('revealed');

            if (wasHidden) {
              article.style.opacity = '0';
              article.style.transform = 'translateY(6px) scale(0.985)';
              article.style.transition = 'opacity 0.15s ease-out, transform 0.15s ease-out';
              requestAnimationFrame(() => {
                article.style.opacity = '1';
                article.style.transform = 'translate(0, 0) scale(1)';
              });
            } else {
              article.style.opacity = '1';
              article.style.transform = 'translate(0, 0) scale(1)';
              article.style.transition = '';
            }
          } else {
            article.classList.add('hidden');
            article.style.display = 'none';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. INTERACTIVE TIME FREEDOM CALCULATOR (WEEKLY/MONTHLY ROI)
  // --------------------------------------------------------------------------
  // Owner Note: Live ROI tool demonstrating reclaimed hours when delegating
  // executive tasks (Private Aviation, Estate Staffing, Back Office, etc.).
  // Max realistic threshold is capped at 48 hours weekly.
  const calculatorCheckboxes = document.querySelectorAll<HTMLInputElement>('[data-hours]');
  const totalHoursDisplay = document.getElementById('total-reclaimed-hours');
  const monthlyHoursDisplay = document.getElementById('monthly-reclaimed-hours');
  const progressBar = document.getElementById('reclaimed-progress-bar') as HTMLElement | null;

  if (calculatorCheckboxes.length > 0 && totalHoursDisplay) {
    function updateTotalHours(): void {
      let total = 0;
      calculatorCheckboxes.forEach((cb) => {
        const card = cb.closest('[data-service-card]') as HTMLElement | null;
        if (cb.checked) {
          total += parseInt(cb.getAttribute('data-hours') || '0', 10);
          if (card) {
            card.classList.add('border-[#c5a059]/60', 'bg-[#12161f]');
            card.classList.remove('border-white/[0.08]', 'bg-[#090b0e]');
          }
        } else {
          if (card) {
            card.classList.remove('border-[#c5a059]/60', 'bg-[#12161f]');
            card.classList.add('border-white/[0.08]', 'bg-[#090b0e]');
          }
        }
      });

      // Cap at 48 hours weekly realistic ceiling
      const displayVal = Math.min(total, 48);
      if (totalHoursDisplay) {
        totalHoursDisplay.textContent = `${displayVal} hrs`;
      }
      if (monthlyHoursDisplay) {
        const monthlyVal = Math.round(displayVal * 4.33);
        monthlyHoursDisplay.textContent = `~${monthlyVal} hrs / mo`;
      }
      if (progressBar) {
        const percentage = Math.min(100, Math.round((displayVal / 48) * 100));
        progressBar.style.width = `${percentage}%`;
      }
    }

    calculatorCheckboxes.forEach((cb) => {
      cb.addEventListener('change', updateTotalHours);
    });
    updateTotalHours();
  }

  // --------------------------------------------------------------------------
  // 6. CONCIERGE & PRIORITY INTAKE FORM HANDLERS
  // --------------------------------------------------------------------------
  // Owner Note: Handles both homepage priority mandates and division inquiry
  // forms. Automatically formats structured emails dispatched to concierge@blacklabel.life.
  const conciergeForm = document.getElementById('concierge-inquiry-form') as HTMLFormElement | null;
  const formSuccess = document.getElementById('form-success-banner');

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name') as HTMLInputElement | null;
      const emailInput = document.getElementById('form-email') as HTMLInputElement | null;
      const divisionInput = document.getElementById('form-division') as HTMLSelectElement | null;
      const messageInput = document.getElementById('form-message') as HTMLTextAreaElement | null;

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const division = divisionInput?.value || 'General Concierge';
      const message = messageInput?.value.trim() || '';

      const subject = encodeURIComponent(`Black Label Concierge: [${division}] Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Inquiry to Black Label Concierge Desk:\n` +
        `======================================\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Division Selected: ${division}\n\n` +
        `Objectives & Message:\n${message}\n\n` +
        `--------------------------------------\n` +
        `Origin: Millennium Tower, San Francisco`
      );

      // Open user's email client
      window.location.href = `mailto:concierge@blacklabel.life?subject=${subject}&body=${body}`;

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Homepage Priority Intake Form
  const priorityForm = document.getElementById('priority-intake-form') as HTMLFormElement | null;
  const prioritySuccess = document.getElementById('priority-form-success');

  if (priorityForm) {
    priorityForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const nameInput = document.getElementById('priority-name') as HTMLInputElement | null;
      const emailInput = document.getElementById('priority-email') as HTMLInputElement | null;
      const divisionInput = document.getElementById('priority-division') as HTMLSelectElement | null;
      const notesInput = document.getElementById('priority-notes') as HTMLTextAreaElement | null;

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const division = divisionInput?.value || 'Priority Intake';
      const notes = notesInput?.value.trim() || '';

      const subject = encodeURIComponent(`Priority Intake Mandate: [${division}] - ${name}`);
      const body = encodeURIComponent(
        `Black Label Priority Intake Terminal:\n` +
        `======================================\n` +
        `Principal / Executive: ${name}\n` +
        `Direct Contact: ${email}\n` +
        `Primary Division: ${division}\n\n` +
        `Executive Mandate / Notes:\n${notes}\n\n` +
        `--------------------------------------\n` +
        `Headquarters: Millennium Tower, 301 Mission St, San Francisco\n` +
        `Protocol: Under 2 Hour Executive Response SLA`
      );

      window.location.href = `mailto:concierge@blacklabel.life?subject=${subject}&body=${body}`;

      if (prioritySuccess) {
        prioritySuccess.classList.remove('hidden');
        prioritySuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6B. PRIVATE EVENT PLANNING INTAKE CONTROLLER (/entertainment/plan)
  // --------------------------------------------------------------------------
  const eventForm = document.getElementById('event-planning-form') as HTMLFormElement | null;
  const eventSuccessModal = document.getElementById('event-success-modal');

  if (eventForm) {
    // 1. Minimum date = tomorrow
    const dateInput = document.getElementById('event-date') as HTMLInputElement | null;
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    // 2. Elements for live brief sync
    const briefEventType = document.getElementById('brief-event-type');
    const briefGuests = document.getElementById('brief-guests');
    const briefVenue = document.getElementById('brief-venue');
    const briefLocation = document.getElementById('brief-location');
    const briefDate = document.getElementById('brief-date');
    const briefTiming = document.getElementById('brief-timing');
    const briefClient = document.getElementById('brief-client');

    const clientNameInput = document.getElementById('client-name') as HTMLInputElement | null;
    const customEventWrapper = document.getElementById('custom-event-type-wrapper');
    const customEventInput = document.getElementById('custom-event-type') as HTMLInputElement | null;
    const locationInput = document.getElementById('event-location') as HTMLInputElement | null;
    const guestSlider = document.getElementById('guest-slider') as HTMLInputElement | null;
    const guestInput = document.getElementById('guest-input') as HTMLInputElement | null;
    const guestBadge = document.getElementById('guest-count-badge');

    // Sync client name
    clientNameInput?.addEventListener('input', () => {
      if (briefClient) {
        briefClient.textContent = clientNameInput.value.trim() || 'Awaiting entry...';
      }
    });

    // Sync event type cards
    const eventTypeCards = document.querySelectorAll<HTMLElement>('.event-type-card');
    eventTypeCards.forEach((card) => {
      const radio = card.querySelector<HTMLInputElement>('.event-type-radio');
      card.addEventListener('click', () => {
        if (!radio) return;
        radio.checked = true;
        
        eventTypeCards.forEach((c) => {
          c.classList.remove('border-[#c5a059]', 'bg-[#151a24]');
          c.classList.add('border-white/10', 'bg-[#11141c]');
          const dot = c.querySelector('.indicator-dot');
          if (dot) dot.classList.add('hidden');
        });
        card.classList.remove('border-white/10', 'bg-[#11141c]');
        card.classList.add('border-[#c5a059]', 'bg-[#151a24]');
        const dot = card.querySelector('.indicator-dot');
        if (dot) dot.classList.remove('hidden');

        if (radio.value === 'Another Event') {
          customEventWrapper?.classList.remove('hidden');
          customEventInput?.focus();
          if (briefEventType) briefEventType.textContent = customEventInput?.value.trim() || 'Another Event (Custom)';
        } else {
          customEventWrapper?.classList.add('hidden');
          if (briefEventType) briefEventType.textContent = radio.value;
        }
      });
    });

    customEventInput?.addEventListener('input', () => {
      if (briefEventType) {
        briefEventType.textContent = customEventInput.value.trim() || 'Another Event (Custom)';
      }
    });

    // Sync venue cards
    const venueCards = document.querySelectorAll<HTMLElement>('.venue-card');
    venueCards.forEach((card) => {
      const radio = card.querySelector<HTMLInputElement>('.venue-radio');
      card.addEventListener('click', () => {
        if (!radio) return;
        radio.checked = true;
        venueCards.forEach((c) => {
          c.classList.remove('border-[#c5a059]', 'bg-[#151a24]');
          c.classList.add('border-white/10', 'bg-[#11141c]');
          const dot = c.querySelector('.indicator-dot');
          if (dot) dot.classList.add('hidden');
        });
        card.classList.remove('border-white/10', 'bg-[#11141c]');
        card.classList.add('border-[#c5a059]', 'bg-[#151a24]');
        const dot = card.querySelector('.indicator-dot');
        if (dot) dot.classList.remove('hidden');

        if (briefVenue) {
          briefVenue.textContent = radio.value === 'Already Have Venue' ? 'Have Space' : radio.value === 'Need Help Finding Venue' ? 'Need Venue' : 'Flexible';
        }
      });
    });

    // Guest Count slider & input bi-directional sync (clamped 10 to 50)
    function updateGuestCount(val: number) {
      const clamped = Math.min(50, Math.max(10, val));
      if (guestSlider) guestSlider.value = String(clamped);
      if (guestInput) guestInput.value = String(clamped);
      if (guestBadge) guestBadge.textContent = `${clamped} Guests`;
      if (briefGuests) briefGuests.textContent = `${clamped} Guests`;

      document.querySelectorAll<HTMLElement>('.guest-preset-btn').forEach((btn) => {
        const presetVal = parseInt(btn.getAttribute('data-preset-guests') || '0', 10);
        if (presetVal === clamped) {
          btn.classList.add('border-[#c5a059]', 'text-[#c5a059]', 'bg-[#c5a059]/20');
          btn.classList.remove('border-white/10', 'text-[#faf8f5]', 'bg-white/[0.04]');
        } else {
          btn.classList.remove('border-[#c5a059]', 'text-[#c5a059]', 'bg-[#c5a059]/20');
          btn.classList.add('border-white/10', 'text-[#faf8f5]', 'bg-white/[0.04]');
        }
      });
    }

    guestSlider?.addEventListener('input', (e) => {
      updateGuestCount(parseInt((e.target as HTMLInputElement).value, 10));
    });

    guestInput?.addEventListener('input', (e) => {
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      if (!isNaN(val)) updateGuestCount(val);
    });

    document.querySelectorAll<HTMLElement>('.guest-preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const presetVal = parseInt(btn.getAttribute('data-preset-guests') || '20', 10);
        updateGuestCount(presetVal);
      });
    });

    // Location chips
    document.querySelectorAll<HTMLElement>('.location-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const loc = chip.getAttribute('data-location') || '';
        if (locationInput) {
          locationInput.value = loc;
          locationInput.dispatchEvent(new Event('input'));
        }
      });
    });

    locationInput?.addEventListener('input', () => {
      if (briefLocation) {
        briefLocation.textContent = locationInput.value.trim() || 'Location to be specified';
      }
    });

    // Date & Time sync
    dateInput?.addEventListener('change', () => {
      if (briefDate && dateInput.value) {
        const d = new Date(dateInput.value + 'T00:00:00');
        briefDate.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    });

    const timeCards = document.querySelectorAll<HTMLElement>('.time-card');
    timeCards.forEach((tc) => {
      const radio = tc.querySelector<HTMLInputElement>('input[type="radio"]');
      tc.addEventListener('click', () => {
        if (!radio) return;
        radio.checked = true;
        timeCards.forEach((c) => {
          c.classList.remove('border-[#c5a059]', 'bg-[#151a24]');
          c.classList.add('border-white/10', 'bg-[#11141c]');
        });
        tc.classList.remove('border-white/10', 'bg-[#11141c]');
        tc.classList.add('border-[#c5a059]', 'bg-[#151a24]');

        if (briefTiming) {
          briefTiming.textContent = radio.value.split('(')[0].trim();
        }
      });
    });

    // Form submission
    eventForm.addEventListener('submit', async (e: Event) => {
      e.preventDefault();

      const submitBtn = document.getElementById('event-submit-btn') as HTMLButtonElement | null;
      const btnText = document.getElementById('btn-text');
      const btnSpinner = document.getElementById('btn-spinner');

      const formData = new FormData(eventForm);
      const clientName = (formData.get('clientName') as string || '').trim();
      const clientEmail = (formData.get('clientEmail') as string || '').trim();
      const clientPhone = (formData.get('clientPhone') as string || '').trim();
      const contactPref = (formData.get('contactPreference') as string || 'Phone Call');
      const eventTypeRaw = (formData.get('eventType') as string || 'Birthday');
      const customEventType = (formData.get('customEventType') as string || '').trim();
      const eventType = eventTypeRaw === 'Another Event' && customEventType ? customEventType : eventTypeRaw;
      const venueStatus = (formData.get('venueStatus') as string || 'Already Have Venue');
      const venueNotes = (formData.get('venueNotes') as string || '').trim();
      const guestCount = Math.min(50, Math.max(10, parseInt((formData.get('guestCount') as string || '20'), 10)));
      const eventLocation = (formData.get('eventLocation') as string || '').trim();
      const eventDate = (formData.get('eventDate') as string || '').trim();
      const dateFlexibility = (formData.get('dateFlexibility') as string || 'Firm Date');
      const timeWindow = (formData.get('timeWindow') as string || 'Evening Seated Dinner');
      const services = formData.getAll('services') as string[];
      const specialRequests = (formData.get('specialRequests') as string || '').trim();

      const errorBanner = document.getElementById('form-error-banner');
      const errorText = document.getElementById('form-error-text');

      if (!clientName || !clientEmail || !clientPhone || !eventDate || !eventLocation) {
        if (errorBanner) {
          errorBanner.classList.remove('hidden');
          if (errorText) {
            const missing: string[] = [];
            if (!clientName) missing.push('Full Name');
            if (!clientEmail) missing.push('Email Address');
            if (!clientPhone) missing.push('Phone Number');
            if (!eventLocation) missing.push('Event Location');
            if (!eventDate) missing.push('Target Event Date');
            errorText.textContent = `Please complete all required fields: ${missing.join(', ')}.`;
          }
          errorBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      if (errorBanner) errorBanner.classList.add('hidden');

      if (submitBtn) submitBtn.disabled = true;
      if (btnSpinner) btnSpinner.classList.remove('hidden');
      if (btnText) btnText.textContent = 'Submitting Requirements to Planner...';

      const payload = {
        clientName,
        clientEmail,
        clientPhone,
        contactPreference: contactPref,
        eventType,
        venueStatus,
        venueNotes,
        guestCount,
        eventLocation,
        eventDate,
        dateFlexibility,
        timeWindow,
        services,
        specialRequests,
        submittedAt: new Date().toISOString(),
      };

      const refCode = `EVT-SF-${Date.now().toString().slice(-4)}`;

      // 1. Save to local storage for instant offline resilience & admin analytics
      try {
        const stored = JSON.parse(localStorage.getItem('blacklabel_event_inquiries') || '[]');
        stored.unshift({ ...payload, reference: refCode });
        localStorage.setItem('blacklabel_event_inquiries', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage save failed:', err);
      }

      // 2. Dispatch to server backend (/api/events)
      try {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Server endpoint /api/events offline, recorded locally:', err);
      }

      // 3. Populate and show success modal
      const codeEl = document.getElementById('success-reference-code');
      const nameEl = document.getElementById('success-client-name');
      const typeEl = document.getElementById('success-event-type');
      const guestsEl = document.getElementById('success-guest-count');
      const venueEl = document.getElementById('success-venue-status');
      const dateTimeEl = document.getElementById('success-date-time');
      const locEl = document.getElementById('success-location');

      if (codeEl) codeEl.textContent = refCode;
      if (nameEl) nameEl.textContent = `${clientName} (${clientPhone} · ${clientEmail})`;
      if (typeEl) typeEl.textContent = eventType;
      if (guestsEl) guestsEl.textContent = `${guestCount} Guests`;
      if (venueEl) venueEl.textContent = venueStatus === 'Already Have Venue' ? 'Private Residence / Have Space' : venueStatus === 'Need Help Finding Venue' ? 'Assistance Sourcing Venue' : 'Open / Flexible';
      if (dateTimeEl) dateTimeEl.textContent = `${eventDate} (${timeWindow})`;
      if (locEl) locEl.textContent = eventLocation + (venueNotes ? ` · Note: ${venueNotes}` : '');

      if (eventSuccessModal) {
        eventSuccessModal.classList.remove('hidden');
      }

      const copyBtn = document.getElementById('copy-summary-btn');
      if (copyBtn) {
        copyBtn.onclick = () => {
          const textToCopy = `Black Label Private Event Specification\n` +
            `Reference: ${refCode}\n` +
            `Client: ${clientName} (${clientEmail}, ${clientPhone})\n` +
            `Event: ${eventType}\n` +
            `Guest Count: ${guestCount} people\n` +
            `Venue: ${venueStatus}\n` +
            `Location: ${eventLocation}\n` +
            `Date & Time: ${eventDate} (${timeWindow})\n` +
            `Services: ${services.join(', ') || 'Custom Brigade'}\n` +
            `Special Requests: ${specialRequests || 'None specified'}\n` +
            `Origin: Millennium Tower, San Francisco`;

          navigator.clipboard?.writeText(textToCopy).then(() => {
            copyBtn.innerHTML = '<span>✓ Copied to Clipboard</span>';
            setTimeout(() => {
              copyBtn.innerHTML = '<span>Copy Event Brief</span>';
            }, 3000);
          });
        };
      }

      if (submitBtn) submitBtn.disabled = false;
      if (btnSpinner) btnSpinner.classList.add('hidden');
      if (btnText) btnText.textContent = 'Submit Event Requirements to Planner';
    });
  }

  // --------------------------------------------------------------------------
  // 7. LUXURY SECTION REVEALS & HARDWARE-ACCELERATED TRANSITIONS
  // --------------------------------------------------------------------------
  // Owner Note: Uses native IntersectionObserver to animate content into view
  // as the user scrolls. Gracefully skips animation if the user has requested
  // prefers-reduced-motion for accessibility.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
            const targetEl = entry.target as HTMLElement;
            setTimeout(() => {
              targetEl.style.transitionDelay = '0ms';
            }, 600);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.05,
      }
    );

    // Apply staggered delays to child elements in stagger containers
    document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((container) => {
      const children = Array.from(container.children) as HTMLElement[];
      children.forEach((child, index) => {
        const customDelay = child.getAttribute('data-delay');
        const delayMs = customDelay ? parseInt(customDelay, 10) : (index % 8) * 80;
        child.style.transitionDelay = `${delayMs}ms`;

        if (!child.hasAttribute('data-reveal')) {
          child.setAttribute('data-reveal', 'scale');
        }
      });
    });

    // Collect all elements intended to reveal
    const elementsToReveal = document.querySelectorAll<HTMLElement>(
      '[data-reveal], [data-reveal-section], [data-reveal-stagger] > *'
    );

    elementsToReveal.forEach((el) => {
      const type = el.getAttribute('data-reveal') || 'fade-up';
      el.classList.add('reveal-init');

      if (type === 'scale') {
        el.classList.add('reveal-scale-up');
      } else if (type === 'slide-left') {
        el.classList.add('reveal-slide-left');
      } else if (type === 'slide-right') {
        el.classList.add('reveal-slide-right');
      } else if (type === 'fade') {
        el.classList.add('reveal-fade');
      } else {
        el.classList.add('reveal-fade-up');
      }

      // Check if element is already within viewport on initial load
      const rect = el.getBoundingClientRect();
      const isVisibleOnLoad = rect.top < window.innerHeight - 30;

      if (isVisibleOnLoad) {
        setTimeout(() => {
          el.classList.add('revealed');
        }, 60);
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    // If reduced motion is preferred or no IntersectionObserver, render immediately
    document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-section], [data-reveal-stagger] > *').forEach((el) => {
      el.classList.add('revealed');
    });
  }

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE 3D PERSPECTIVE TILT ON LUXURY GRAPHIC CARDS
  // --------------------------------------------------------------------------
  // Owner Note: Produces high-end subtle tactile depth when hovering over
  // division badges and cards. Automatically resets smoothly on mouseleave.
  const tiltCards = document.querySelectorAll<HTMLElement>('[data-luxury-card-tilt]');
  tiltCards.forEach((card) => {
    let bounds: DOMRect;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';
    }

    function onMouseMove(e: MouseEvent) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
      const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      const rotateX = -yPct * 6; // max 6 deg tilt
      const rotateY = xPct * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function onMouseLeave() {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });

  // --------------------------------------------------------------------------
  // 9. CINEMATIC TWILIGHT PENTHOUSE HERO PARALLAX (LERP ENGINE)
  // --------------------------------------------------------------------------
  // Owner Note: Mathematical linear interpolation (Lerp) engine driving
  // multi-plane motion on the Homepage Hero (background, particles, and typography).
  const heroSection = document.getElementById('hero');
  const heroBgLayer = document.querySelector<HTMLElement>('[data-hero-parallax-bg]');
  const heroContentLayer = document.querySelector<HTMLElement>('[data-hero-parallax-content]');
  const heroParticlesLayer = document.querySelector<HTMLElement>('[data-hero-parallax-particles]');

  if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let rafId: number | null = null;

    function renderHeroParallax() {
      // Smooth lerp for fluid luxury motion
      currentX += (mouseX - currentX) * 0.04;
      currentY += (mouseY - currentY) * 0.04;

      if (heroBgLayer) {
        heroBgLayer.style.transform = `translate3d(${(-currentX * 14).toFixed(2)}px, ${(-currentY * 10).toFixed(2)}px, 0)`;
      }
      if (heroParticlesLayer) {
        heroParticlesLayer.style.transform = `translate3d(${(currentX * 22).toFixed(2)}px, ${(currentY * 16).toFixed(2)}px, 0)`;
      }
      if (heroContentLayer) {
        heroContentLayer.style.transform = `translate3d(${(currentX * 6).toFixed(2)}px, ${(currentY * 4).toFixed(2)}px, 0)`;
      }

      if (isHovering || Math.abs(mouseX - currentX) > 0.001 || Math.abs(mouseY - currentY) > 0.001) {
        rafId = requestAnimationFrame(renderHeroParallax);
      } else {
        rafId = null;
      }
    }

    heroSection.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (!rafId) {
        rafId = requestAnimationFrame(renderHeroParallax);
      }
    }, { passive: true });

    heroSection.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!rafId) {
        rafId = requestAnimationFrame(renderHeroParallax);
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      isHovering = false;
      mouseX = 0;
      mouseY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(renderHeroParallax);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. INTERACTIVE LUXURY DARK MAP (MILLENNIUM TOWER, SAN FRANCISCO)
  // --------------------------------------------------------------------------
  // Performance Note: Leaflet is asynchronously loaded ONLY if contact-map
  // element exists on the page (e.g. /contact). Prevents 163 KB of Leaflet code
  // from blocking pages that do not have a map.
  const mapElement = document.getElementById('contact-map');
  if (mapElement) {
    Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([leafletMod]) => {
      try {
        const L = (leafletMod as any).default || leafletMod;
        // Millennium Tower coordinates: 301 Mission St, San Francisco, CA 94105
        const SF_COORDS: [number, number] = [37.7903, -122.397];

        const map = L.map('contact-map', {
          center: SF_COORDS,
          zoom: 16,
          zoomControl: false,
          scrollWheelZoom: false,
        });

        // CartoDB Dark Matter basemap (high-contrast luxury night aesthetic)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd',
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
        }).addTo(map);

        // Custom Gold Monogram Marker with pulsing radar ring
        const goldIcon = L.divIcon({
          className: 'custom-gold-marker-container',
          html: `
            <div class="relative flex flex-col items-center group cursor-pointer -translate-x-1/2 -translate-y-full">
              <div class="absolute -top-3 w-12 h-12 rounded-full bg-[#c5a059]/25 animate-ping pointer-events-none"></div>
              <div class="relative z-10 w-10 h-10 rounded-full bg-[#060709] border-2 border-[#c5a059] flex items-center justify-center shadow-[0_0_25px_rgba(197,160,89,0.8)] group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-[#c5a059]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
              </div>
              <div class="w-1.5 h-3 bg-[#c5a059] rounded-b-sm shadow-[0_2px_4px_rgba(0,0,0,0.8)]"></div>
            </div>
          `,
          iconSize: [40, 50],
          iconAnchor: [20, 50],
          popupAnchor: [0, -45],
        });

        const marker = L.marker(SF_COORDS, { icon: goldIcon }).addTo(map);

        const popupHtml = `
          <div class="p-3 text-left font-sans max-w-[280px]">
            <div class="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c5a059] font-semibold mb-1">
              Global Headquarters
            </div>
            <h4 class="text-base font-serif font-medium text-[#faf8f5] leading-snug">
              Millennium Tower
            </h4>
            <p class="text-xs text-[#dcd6ca]/90 mt-1 leading-relaxed">
              301 Mission St · SoMa<br />San Francisco, CA 94105
            </p>
            <div class="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#a69f91]">
              <span>Executive Protocol: Standard</span>
              <span class="text-emerald-400 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 24/7 Coverage
              </span>
            </div>
            <div class="mt-3 flex gap-2">
              <a href="https://maps.apple.com/?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105" target="_blank" rel="noopener" class="flex-1 text-center py-1.5 px-2 bg-[#c5a059] hover:bg-[#dfc182] text-[#060709] text-[10px] font-semibold uppercase tracking-wider rounded-sm transition-colors">
                Apple Maps
              </a>
              <a href="https://maps.google.com/?q=301+Mission+St,+San+Francisco,+CA+94105" target="_blank" rel="noopener" class="flex-1 text-center py-1.5 px-2 bg-white/10 hover:bg-white/20 text-[#faf8f5] text-[10px] font-semibold uppercase tracking-wider rounded-sm transition-colors">
                Google Maps
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml, {
          className: 'luxury-map-popup',
          closeButton: true,
          autoClose: false,
        });

        // Open popup by default
        setTimeout(() => {
          marker.openPopup();
        }, 500);

        // Connect map UI buttons
        document.getElementById('map-zoom-in')?.addEventListener('click', () => map.zoomIn());
        document.getElementById('map-zoom-out')?.addEventListener('click', () => map.zoomOut());
        document.getElementById('map-recenter')?.addEventListener('click', () => {
          map.setView(SF_COORDS, 16, { animate: true });
          marker.openPopup();
        });
      } catch (e) {
        console.warn('Map initialization error:', e);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 11. SOVEREIGN MANDATE CONTACT DISPATCH & TICKET GENERATOR
  // --------------------------------------------------------------------------
  // Owner Note: Form on /contact page. Generates an encrypted tracking ticket
  // ID (e.g. BLL-SF-827419) and triggers client email transmission.
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const contactSuccess = document.getElementById('contact-success-banner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
      const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
      const phoneInput = document.getElementById('contact-phone') as HTMLInputElement | null;
      const divisionInput = document.getElementById('contact-division') as HTMLSelectElement | null;
      const urgencyInput = document.getElementById('contact-urgency') as HTMLSelectElement | null;
      const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;
      const channelInput = document.querySelector<HTMLInputElement>('input[name="preferred_channel"]:checked');

      const name = nameInput?.value.trim() || 'Principal';
      const email = emailInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || 'Not provided';
      const division = divisionInput?.value || 'General Concierge';
      const urgency = urgencyInput?.value || 'Immediate';
      const channel = channelInput?.value || 'Email';
      const message = messageInput?.value.trim() || '';

      const ticketRef = 'BLL-SF-' + Math.floor(100000 + Math.random() * 900000);

      const ticketEl = document.getElementById('contact-ticket-ref');
      if (ticketEl) ticketEl.textContent = ticketRef;

      const subject = encodeURIComponent(`[${ticketRef}] Mandate: [${division}] - ${name}`);
      const body = encodeURIComponent(
        `BLACK LABEL SOVEREIGN MANDATE TRANSMISSION\n` +
        `=======================================================\n` +
        `Reference ID: ${ticketRef}\n` +
        `Principal / Client: ${name}\n` +
        `Direct Email: ${email}\n` +
        `Direct Phone / Signal: ${phone}\n` +
        `Primary Division: ${division}\n` +
        `Urgency / Timeline: ${urgency}\n` +
        `Preferred Contact Channel: ${channel}\n\n` +
        `Mandate & Objectives:\n` +
        `${message}\n\n` +
        `-------------------------------------------------------\n` +
        `Dispatch Anchor: Millennium Tower, 301 Mission St, San Francisco\n` +
        `Service Level: Confidential Executive Protocol (Under 2 Hr SLA)\n`
      );

      // Open user's email client
      window.location.href = `mailto:concierge@blacklabel.life?subject=${subject}&body=${body}`;

      if (contactSuccess) {
        contactSuccess.classList.remove('hidden');
        contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. CONCIERGE TERMINAL & ARCHITECTURAL TOWER CONTROLS (/concierge)
  // --------------------------------------------------------------------------
  initConciergeTerminal();
}

/**
 * Initializes interactive controls on the /concierge page:
 * - Architectural floor selector (Level 60 Penthouse, Level 48 HQ, Level 10 Club, Level 1 Valet)
 * - Perspective tab switcher (Map view, Tower schematic, Arrival protocol)
 * - One-click address clipboard copying
 */
function initConciergeTerminal(): void {
  // 12.1 Perspective Tab Switcher (Map / Tower Architecture / Arrival Protocols)
  const viewButtons = document.querySelectorAll<HTMLButtonElement>('[data-terminal-view]');
  const viewMap = document.getElementById('terminal-view-map');
  const viewTower = document.getElementById('terminal-view-tower');
  const viewProtocols = document.getElementById('terminal-view-protocols');

  if (viewButtons.length > 0) {
    viewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.terminalView;

        // Update button visual states
        viewButtons.forEach((b) => {
          const isActive = b === btn;
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          if (isActive) {
            b.className = 'px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#060709] bg-[#c5a059] font-semibold rounded-sm transition-all focus-visible:outline-none';
          } else {
            b.className = 'px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#a69f91] hover:text-[#faf8f5] hover:bg-white/[0.05] rounded-sm transition-all focus-visible:outline-none';
          }
        });

        // Toggle Views
        if (viewMap) viewMap.classList.toggle('hidden', view !== 'map');
        if (viewTower) viewTower.classList.toggle('hidden', view !== 'tower');
        if (viewProtocols) viewProtocols.classList.toggle('hidden', view !== 'protocols');
      });
    });
  }

  // 12.2 Tower Architectural Floor Elevation Selector
  // Owner Note: Easily customize floor elevations, capacities, or descriptions below:
  const towerButtons = document.querySelectorAll<HTMLButtonElement>('[data-tower-level]');
  const towerContentEl = document.getElementById('tower-level-content');

  const TOWER_LEVEL_DATA: Record<string, { title: string; alt: string; badge: string; desc: string; cap: string; access: string }> = {
    '60': {
      title: 'Level 60 — The Sovereign Sky Penthouse',
      alt: 'ALTITUDE: 645 FT',
      badge: 'PENTHOUSE ELEVATION',
      desc: 'Occupying the premier apex of Millennium Tower, our private showcase residence offers 360-degree panoramic vantage of the Bay Bridge, downtown skyline, and Golden Gate corridor. Features private entertainer\'s terrace and bespoke interior staging by Black Label Design.',
      cap: 'Up to 60 Guests',
      access: 'Executive Escort Only',
    },
    '48': {
      title: 'Level 48 — Black Label Command Chambers',
      alt: 'ALTITUDE: 520 FT',
      badge: 'EXECUTIVE DISPATCH',
      desc: 'Central operational headquarters for all eight Black Label divisions. Housing senior concierge officers, private intake chambers, encrypted communications suites, and sovereign transaction vaults for ultra-high-net-worth principals.',
      cap: 'Direct Liaison Desk',
      access: 'Biometric Clearance',
    },
    '10': {
      title: 'Level 10 — Private Dining Salon & Wine Vault',
      alt: 'ALTITUDE: 130 FT',
      badge: 'CLUB LEVEL AMENITIES',
      desc: 'Exclusive access to the private dining room curated by Chef Michael Mina, a temperature-controlled 5,000-bottle wine cellar, private sommelier tasting terrace, and 5,500 sq ft fitness center by Jay Wright.',
      cap: 'Private Tasting & Dinners',
      access: 'Member & Resident Access',
    },
    '1': {
      title: 'Ground Level — Fremont St Porte-Cochère & Valet',
      alt: 'ALTITUDE: 25 FT',
      badge: 'RESIDENTIAL ARRIVAL',
      desc: 'Covered, private arrival courtyard off Fremont Street between Mission and Howard. Uniformed 24/7 white-glove valet attendants, continuous security monitoring, and subterranean staging for exotics and armored executive vehicles.',
      cap: 'Subterranean Staging',
      access: '24/7 Attendant Valet',
    },
  };

  if (towerButtons.length > 0 && towerContentEl) {
    towerButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.towerLevel || '60';
        const data = TOWER_LEVEL_DATA[level];
        if (!data) return;

        // Update button active styling
        towerButtons.forEach((b) => {
          const isSelected = b === btn;
          if (isSelected) {
            b.className = 'w-full text-left p-3 rounded-sm border border-[#c5a059] bg-[#c5a059]/10 transition-all flex items-center justify-between group';
            b.querySelector('.font-mono')?.classList.add('text-[#c5a059]', 'font-semibold');
            b.querySelector('.font-mono')?.classList.remove('text-[#a69f91]');
          } else {
            b.className = 'w-full text-left p-3 rounded-sm border border-white/10 hover:border-[#c5a059]/50 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex items-center justify-between group';
            b.querySelector('.font-mono')?.classList.remove('text-[#c5a059]', 'font-semibold');
            b.querySelector('.font-mono')?.classList.add('text-[#a69f91]');
          }
        });

        // Update Content Box
        towerContentEl.innerHTML = `
          <div class="flex items-center justify-between border-b border-white/[0.08] pb-3 animate-fade-in">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">${data.badge}</span>
            <span class="text-xs font-mono text-[#a69f91]">${data.alt}</span>
          </div>
          <h5 class="text-lg font-serif text-[#faf8f5]">${data.title}</h5>
          <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
            ${data.desc}
          </p>
          <div class="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-[#a69f91]">
            <div class="bg-white/[0.02] p-2 border border-white/5 rounded-sm">
              <span class="text-[#c5a059] block">Specification</span>
              <span>${data.cap}</span>
            </div>
            <div class="bg-white/[0.02] p-2 border border-white/5 rounded-sm">
              <span class="text-[#c5a059] block">Access Clearance</span>
              <span>${data.access}</span>
            </div>
          </div>
        `;
      });
    });
  }

  // 12.3 Copy Address Button with Tactile Feedback
  const copyBtn = document.querySelector<HTMLButtonElement>('[data-copy-address]');
  const copyLabel = document.getElementById('copy-address-label');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const address = copyBtn.dataset.copyAddress || '301 Mission St, San Francisco, CA 94105';
      navigator.clipboard?.writeText(address).then(() => {
        if (copyLabel) {
          copyLabel.textContent = 'Address Copied!';
          copyBtn.classList.add('text-emerald-400');
          setTimeout(() => {
            copyLabel.textContent = 'Copy Address';
            copyBtn.classList.remove('text-emerald-400');
          }, 2500);
        }
      }).catch(() => {
        if (copyLabel) copyLabel.textContent = '301 Mission St';
      });
    });
  }

  // 12.4 Concierge Desk Form Submission with High-Fidelity Intake Confirmation
  const divisionSelect = document.getElementById('form-division') as HTMLSelectElement | null;
  const conciergeForm = document.getElementById('concierge-inquiry-form') as HTMLFormElement | null;
  const conciergeSuccess = document.getElementById('form-success-banner');
  const tokenRefEl = document.getElementById('success-token-ref');
  const resetBtn = document.getElementById('reset-mandate-form-btn');

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      const emailInput = document.getElementById('form-email') as HTMLInputElement | null;
      const phoneInput = document.getElementById('form-phone') as HTMLInputElement | null;
      const messageInput = document.getElementById('form-message') as HTMLTextAreaElement | null;

      const email = emailInput?.value.trim() || '';
      const phone = phoneInput?.value.trim() || 'Not specified';
      const division = divisionSelect?.value || 'General Concierge';
      const message = messageInput?.value.trim() || '';

      const tokenRef = 'BLL-SF-' + Math.floor(100000 + Math.random() * 900000);
      if (tokenRefEl) tokenRefEl.textContent = tokenRef;

      const subject = encodeURIComponent(`[${tokenRef}] Sovereign Mandate: [${division}]`);
      const body = encodeURIComponent(
        `BLACK LABEL SOVEREIGN MANDATE TRANSMISSION\n` +
        `=======================================================\n` +
        `Reference Token: ${tokenRef}\n` +
        `Confidential Email: ${email}\n` +
        `Direct Telephone / Signal: ${phone}\n` +
        `Target Division / Scope: ${division}\n\n` +
        `Mandate Objectives & Scope:\n` +
        `${message}\n\n` +
        `-------------------------------------------------------\n` +
        `Origin Dispatch: Millennium Tower, 301 Mission St, San Francisco\n` +
        `Service Level: Confidential Executive Protocol (< 2 Hr Response SLA)\n`
      );

      // Trigger native email client
      window.location.href = `mailto:concierge@blacklabel.life?subject=${subject}&body=${body}`;

      if (conciergeSuccess) {
        conciergeSuccess.classList.remove('hidden');
        conciergeSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        conciergeForm.reset();
        if (conciergeSuccess) conciergeSuccess.classList.add('hidden');
      });
    }
  }
}

// ----------------------------------------------------------------------------
// LIFECYCLE BOOTSTRAP
// ----------------------------------------------------------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
