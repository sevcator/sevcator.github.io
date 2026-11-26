(function () {
  'use strict';

  const ICONS_CONFIG = [
    {
      id: 'youtube',
      url: 'https://youtube.com/@sevcator',
      svg: `<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="5"></rect><polygon points="10 9 15 12 10 15 10 9"></polygon></svg>`
    },
    {
      id: 'telegram',
      url: 'https://t.me/sevcator',
      svg: `<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`
    },
    {
      id: 'github',
      url: 'https://github.com/sevcator',
      svg: `<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`
    },
    {
      id: 'discord',
      copyText: '@sevcator',
      svg: `<svg viewBox="0 0 24 24"><path d="M18 6c-1.3-.6-2.6-1-4-1.2 0 0-.2.4-.4.8-1.5-.2-3-.2-4.4 0-.2-.4-.4-.8-.4-.8-1.4.2-2.7.6-4 1.2C3 10.7 2.2 15.3 2.6 19.8c1.8 1.3 3.5 2.1 5.2 2.6.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.7-.9.1-.1.3-.2.4-.3 3.4 1.6 7 1.6 10.4 0 .1.1.3.2.4.3-.5.4-1.1.7-1.7.9.3.7.7 1.3 1.1 1.9 1.7-.5 3.4-1.3 5.2-2.6.5-5.2-.8-9.8-2.6-13.8z"></path><circle cx="8.5" cy="13.5" r="1.5"></circle><circle cx="15.5" cy="13.5" r="1.5"></circle></svg>`
    },
    {
      id: 'pinterest',
      url: 'https://pinterest.com/sevcator',
      svg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"></circle><line x1="8.5" y1="20" x2="12" y2="10.5"></line><path d="M10.5 14.5c.5 1.3 1.6 2 2.8 2 2 0 3.7-1.6 3.7-4 0-2.8-2.2-5-5-5-3.1 0-5.5 2.3-5.5 5.5 0 1.4.5 2.5 1.5 3.2"></path></svg>`
    },
    {
      id: 'soundcloud',
      url: 'https://soundcloud.com/sevcator',
      svg: `<svg viewBox="0 0 24 24"><line x1="3" y1="13" x2="3" y2="17"></line><line x1="6" y1="11" x2="6" y2="17"></line><line x1="9" y1="9" x2="9" y2="17"></line><line x1="12" y1="8" x2="12" y2="17"></line><path d="M12 17h6.5a3.5 3.5 0 0 0 1.5-6.67A4.5 4.5 0 0 0 12 8"></path></svg>`
    },
    {
      id: 'steam',
      url: 'https://steamcommunity.com/id/rewined',
      svg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M13.1 7.1A3.2 3.2 0 1 1 17.4 11.8L10.1 17A2.2 2.2 0 1 1 7.2 13.7Z"/><circle cx="15.5" cy="9.2" r="1.4"/><circle cx="8.8" cy="15.2" r="0.9"/><line x1="7.2" y1="13.7" x2="2.2" y2="11.5"/><line x1="8.2" y1="17.2" x2="3.4" y2="16.2"/></svg>`
    }
  ];

  const container = document.getElementById('physics-container');
  const bgCanvas = document.getElementById('bg-canvas');
  const ctxBg = bgCanvas.getContext('2d');
  const copyToast = document.getElementById('copy-toast');

  let toastTimer = null;

  function showToast(text) {
    if (!copyToast) return;
    copyToast.textContent = `COPIED: ${text}`;
    copyToast.classList.remove('hidden');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      copyToast.classList.add('hidden');
    }, 2000);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(text);
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      el.style.top = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      showToast(text);
    } catch (e) {
      console.warn('Clipboard copy error:', e);
    }
  }

  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function handleResize() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    bgCanvas.width = screenWidth * dpr;
    bgCanvas.height = screenHeight * dpr;
    bgCanvas.style.width = screenWidth + 'px';
    bgCanvas.style.height = screenHeight + 'px';
    ctxBg.setTransform(dpr, 0, 0, dpr, 0, 0);

    bodies.forEach(body => {
      body.clampToBounds();
    });
  }

  window.addEventListener('resize', handleResize);

  const GRAVITY_Y = 1600;
  let bodies = [];

  class PhysicalIcon {
    constructor(config, spawnX, spawnY) {
      this.config = config;

      const maxR = Math.min(92, Math.max(50, Math.round(screenWidth * 0.12)));
      const minR = Math.round(maxR * 0.65);
      this.radius = Math.round(Math.random() * (maxR - minR) + minR);
      this.diameter = this.radius * 2;

      this.mass = (this.radius * this.radius) / 400;
      this.invMass = 1 / this.mass;
      this.inertia = 0.5 * this.mass * this.radius * this.radius;
      this.invInertia = 1 / this.inertia;

      this.x = spawnX !== undefined ? spawnX : Math.random() * (screenWidth - this.diameter) + this.radius;
      this.y = spawnY !== undefined ? spawnY : -this.radius - Math.random() * 100;

      this.vx = (Math.random() - 0.5) * 80;
      this.vy = Math.random() * 120 + 80;

      this.angle = (Math.random() - 0.5) * Math.PI;
      this.omega = (Math.random() - 0.5) * 4;

      this.isHolding = false;
      this.wasDragged = false;
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;

      this.lastPointerX = 0;
      this.lastPointerY = 0;
      this.lastPointerTime = 0;
      this.pointerVx = 0;
      this.pointerVy = 0;

      this.el = document.createElement('div');
      this.el.className = 'physics-icon';
      this.el.style.width = `${this.diameter}px`;
      this.el.style.height = `${this.diameter}px`;
      this.el.style.zIndex = '10';
      this.el.innerHTML = config.svg;

      this.setupEvents();
      container.appendChild(this.el);
    }

    setupEvents() {
      this.el.addEventListener('mouseenter', () => {
        if (!this.isHolding) {
          this.el.style.zIndex = '35';
        }
      });

      this.el.addEventListener('mouseleave', () => {
        if (!this.isHolding) {
          this.el.style.zIndex = '10';
        }
      });

      this.el.addEventListener('click', () => {
        if (!this.wasDragged) {
          if (this.config.copyText) {
            copyToClipboard(this.config.copyText);
          } else if (this.config.url) {
            window.open(this.config.url, '_blank', 'noopener,noreferrer');
          }
        }
      });

      this.el.addEventListener('pointerdown', (e) => {
        this.isHolding = true;
        this.wasDragged = false;
        this.el.style.zIndex = '50';
        this.el.classList.add('holding');
        this.el.setPointerCapture(e.pointerId);

        this.dragOffsetX = e.clientX - this.x;
        this.dragOffsetY = e.clientY - this.y;

        this.lastPointerX = e.clientX;
        this.lastPointerY = e.clientY;
        this.lastPointerTime = performance.now();
        this.pointerVx = 0;
        this.pointerVy = 0;
      });

      this.el.addEventListener('pointermove', (e) => {
        if (!this.isHolding) return;
        const now = performance.now();
        const dt = Math.max(0.001, (now - this.lastPointerTime) / 1000);

        this.pointerVx = (e.clientX - this.lastPointerX) / dt;
        this.pointerVy = (e.clientY - this.lastPointerY) / dt;

        this.lastPointerX = e.clientX;
        this.lastPointerY = e.clientY;
        this.lastPointerTime = now;

        let targetX = e.clientX - this.dragOffsetX;
        let targetY = e.clientY - this.dragOffsetY;

        this.x = Math.max(this.radius, Math.min(screenWidth - this.radius, targetX));
        this.y = Math.max(this.radius, Math.min(screenHeight - this.radius, targetY));

        this.angle = Math.max(-0.5, Math.min(0.5, this.pointerVx * 0.001));

        this.vx = this.pointerVx;
        this.vy = this.pointerVy;
        this.wasDragged = true;

        this.render();
      });

      const releaseHold = () => {
        if (!this.isHolding) return;
        this.isHolding = false;
        this.el.style.zIndex = '10';
        this.el.classList.remove('holding');

        this.vx = Math.max(-1400, Math.min(1400, this.pointerVx || 0));
        this.vy = Math.max(-1600, Math.min(1600, this.pointerVy || 0));
        this.omega = (this.pointerVx || 0) / this.radius * 0.6;

        setTimeout(() => {
          this.wasDragged = false;
        }, 120);
      };

      this.el.addEventListener('pointerup', releaseHold);
      this.el.addEventListener('pointercancel', releaseHold);
    }

    clampToBounds() {
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        if (this.vx < 0) this.vx = 0;
      } else if (this.x + this.radius > screenWidth) {
        this.x = screenWidth - this.radius;
        if (this.vx > 0) this.vx = 0;
      }

      if (this.y - this.radius < 0) {
        this.y = this.radius;
        if (this.vy < 0) this.vy = 0;
      } else if (this.y + this.radius > screenHeight) {
        this.y = screenHeight - this.radius;
        if (this.vy > 0) this.vy = 0;
      }
    }

    render() {
      const halfR = this.radius;
      this.el.style.left = `${this.x - halfR}px`;
      this.el.style.top = `${this.y - halfR}px`;

      const deg = (this.angle * 180) / Math.PI;
      const holdBoost = this.isHolding ? 1.12 : 1;
      this.el.style.transform = `rotate(${deg}deg) scale(${holdBoost})`;
    }

    destroy() {
      if (this.el && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      }
    }
  }

  function stepPhysics(subDt) {
    const len = bodies.length;
    const restitution = 0.48;
    const frictionMu = 0.42;

    for (let i = 0; i < len; i++) {
      const b = bodies[i];
      if (b.isHolding) continue;

      b.vy += GRAVITY_Y * subDt;

      const airDamping = Math.pow(0.992, subDt * 60);
      const rotDamping = Math.pow(0.988, subDt * 60);
      b.vx *= airDamping;
      b.vy *= airDamping;
      b.omega *= rotDamping;

      b.x += b.vx * subDt;
      b.y += b.vy * subDt;
      b.angle += b.omega * subDt;
    }

    const SOLVER_ITERATIONS = 8;
    const PIN_EPSILON = 1.0;

    for (let it = 0; it < SOLVER_ITERATIONS; it++) {
      for (let i = 0; i < len; i++) {
        const b1 = bodies[i];
        for (let j = i + 1; j < len; j++) {
          const b2 = bodies[j];

          let dx = b2.x - b1.x;
          let dy = b2.y - b1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = b1.radius + b2.radius;

          if (distSq < minDist * minDist) {
            let dist = Math.sqrt(distSq);
            if (dist < 0.0001) {
              dist = 0.0001;
              dx = (Math.random() - 0.5) * 0.002;
              dy = (Math.random() - 0.5) * 0.002;
            }

            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            let b1Pinned = false;
            let b2Pinned = false;

            if ((nx > 0.05 && b1.x <= b1.radius + PIN_EPSILON) ||
                (nx < -0.05 && b1.x >= screenWidth - b1.radius - PIN_EPSILON) ||
                (ny > 0.05 && b1.y <= b1.radius + PIN_EPSILON) ||
                (ny < -0.05 && b1.y >= screenHeight - b1.radius - PIN_EPSILON)) {
              b1Pinned = true;
            }

            if ((nx < -0.05 && b2.x <= b2.radius + PIN_EPSILON) ||
                (nx > 0.05 && b2.x >= screenWidth - b2.radius - PIN_EPSILON) ||
                (ny < -0.05 && b2.y <= b2.radius + PIN_EPSILON) ||
                (ny > 0.05 && b2.y >= screenHeight - b2.radius - PIN_EPSILON)) {
              b2Pinned = true;
            }

            if (b1.isHolding && !b2.isHolding) {
              if (b2Pinned) {
                b1.x -= nx * overlap;
                b1.y -= ny * overlap;
              } else {
                b2.x += nx * overlap;
                b2.y += ny * overlap;
              }
            } else if (!b1.isHolding && b2.isHolding) {
              if (b1Pinned) {
                b2.x += nx * overlap;
                b2.y += ny * overlap;
              } else {
                b1.x -= nx * overlap;
                b1.y -= ny * overlap;
              }
            } else if (!b1.isHolding && !b2.isHolding) {
              let w1 = b1Pinned ? 0 : b1.invMass;
              let w2 = b2Pinned ? 0 : b2.invMass;
              let totalW = w1 + w2;

              if (totalW > 0) {
                b1.x -= nx * overlap * (w1 / totalW);
                b1.y -= ny * overlap * (w1 / totalW);
                b2.x += nx * overlap * (w2 / totalW);
                b2.y += ny * overlap * (w2 / totalW);
              } else {
                b1.x -= nx * overlap * 0.5;
                b1.y -= ny * overlap * 0.5;
                b2.x += nx * overlap * 0.5;
                b2.y += ny * overlap * 0.5;
              }
            }
          }
        }
      }

      for (let i = 0; i < len; i++) {
        const b = bodies[i];

        if (b.y + b.radius >= screenHeight) {
          b.y = screenHeight - b.radius;
          if (b.vy > 0) {
            b.vy = -b.vy * restitution;

            const vContact = b.vx + b.omega * b.radius;
            const jFriction = -vContact * (b.mass / 3) * frictionMu;
            b.vx += jFriction * b.invMass;
            b.omega += (jFriction * b.radius) * b.invInertia;

            if (Math.abs(b.vy) < 20) b.vy = 0;
            if (Math.abs(b.vx) < 4 && Math.abs(b.omega) < 0.1) {
              b.vx = 0;
              b.omega = 0;
            }
          }
        }

        if (b.y - b.radius <= 0) {
          b.y = b.radius;
          if (b.vy < 0) {
            b.vy = -b.vy * restitution;

            const vContact = b.vx - b.omega * b.radius;
            const jFriction = -vContact * (b.mass / 3) * frictionMu;
            b.vx += jFriction * b.invMass;
            b.omega -= (jFriction * b.radius) * b.invInertia;

            if (Math.abs(b.vy) < 20) b.vy = 0;
          }
        }

        if (b.x - b.radius <= 0) {
          b.x = b.radius;
          if (b.vx < 0) {
            b.vx = -b.vx * restitution;

            const vContact = b.vy + b.omega * b.radius;
            const jFriction = -vContact * (b.mass / 3) * frictionMu;
            b.vx += jFriction * b.invMass;
            b.omega += (jFriction * b.radius) * b.invInertia;

            if (Math.abs(b.vx) < 20) b.vx = 0;
          }
        }

        if (b.x + b.radius >= screenWidth) {
          b.x = screenWidth - b.radius;
          if (b.vx > 0) {
            b.vx = -b.vx * restitution;

            const vContact = b.vy - b.omega * b.radius;
            const jFriction = -vContact * (b.mass / 3) * frictionMu;
            b.vy += jFriction * b.invMass;
            b.omega -= (jFriction * b.radius) * b.invInertia;

            if (Math.abs(b.vx) < 20) b.vx = 0;
          }
        }
      }
    }

    for (let i = 0; i < len; i++) {
      const b1 = bodies[i];
      for (let j = i + 1; j < len; j++) {
        const b2 = bodies[j];

        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = b1.radius + b2.radius;

        if (distSq <= minDist * minDist && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;
          const tx = -ny;
          const ty = nx;

          const v1x = b1.vx - b1.omega * b1.radius * ty;
          const v1y = b1.vy + b1.omega * b1.radius * tx;
          const v2x = b2.vx + b2.omega * b2.radius * ty;
          const v2y = b2.vy - b2.omega * b2.radius * tx;

          const rvx = v2x - v1x;
          const rvy = v2y - v1y;
          const velNormal = rvx * nx + rvy * ny;

          if (velNormal < 0) {
            const impulseN = -(1 + restitution) * velNormal / (b1.invMass + b2.invMass);
            const impNx = impulseN * nx;
            const impNy = impulseN * ny;

            const velTangent = rvx * tx + rvy * ty;
            const impulseT = -frictionMu * 0.5 * velTangent / (b1.invMass + b2.invMass);
            const impTx = impulseT * tx;
            const impTy = impulseT * ty;

            const totalImpX = impNx + impTx;
            const totalImpY = impNy + impTy;

            if (!b1.isHolding) {
              b1.vx -= totalImpX * b1.invMass;
              b1.vy -= totalImpY * b1.invMass;
              b1.omega -= (impTx * -ty + impTy * tx) * b1.radius * b1.invInertia;
            }
            if (!b2.isHolding) {
              b2.vx += totalImpX * b2.invMass;
              b2.vy += totalImpY * b2.invMass;
              b2.omega += (impTx * -ty + impTy * tx) * b2.radius * b2.invInertia;
            }
          }
        }
      }
    }
  }

  function spawnIcon(config, spawnX, spawnY) {
    const cfg = config || ICONS_CONFIG[Math.floor(Math.random() * ICONS_CONFIG.length)];
    const body = new PhysicalIcon(cfg, spawnX, spawnY);
    bodies.push(body);
    return body;
  }

  function dropInitialIcons() {
    bodies.forEach(b => b.destroy());
    bodies = [];

    ICONS_CONFIG.forEach((cfg, idx) => {
      setTimeout(() => {
        const padding = Math.max(100, Math.round(screenWidth * 0.08));
        const x = padding + Math.random() * (screenWidth - padding * 2);
        spawnIcon(cfg, x, -140);
      }, idx * 160);
    });
  }

  window.addEventListener('dblclick', (e) => {
    if (!e.target.closest('.physics-icon')) {
      spawnIcon(null, e.clientX, -120);
    }
  });

  const bgParticles = [];
  const BG_PARTICLES_COUNT = 45;

  for (let i = 0; i < BG_PARTICLES_COUNT; i++) {
    bgParticles.push({
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      size: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * 15 + 8,
      alpha: Math.random() * 0.4 + 0.15
    });
  }

  function renderBackground(dt) {
    ctxBg.clearRect(0, 0, screenWidth, screenHeight);

    ctxBg.fillStyle = 'rgba(255, 255, 255, 0.25)';
    bgParticles.forEach(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.x < 0) p.x = screenWidth;
      if (p.x > screenWidth) p.x = 0;
      if (p.y > screenHeight) p.y = 0;

      ctxBg.beginPath();
      ctxBg.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctxBg.fill();
    });
  }

  let lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);

    const frameDt = Math.min((now - lastTime) / 1000, 0.04);
    lastTime = now;

    renderBackground(frameDt);

    const SUB_STEPS = 3;
    const subDt = frameDt / SUB_STEPS;

    for (let s = 0; s < SUB_STEPS; s++) {
      stepPhysics(subDt);
    }

    bodies.forEach(body => {
      body.render();
    });
  }

  handleResize();
  dropInitialIcons();
  requestAnimationFrame(animate);

})();