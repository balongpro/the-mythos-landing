/* ==========================================================================
   THE MYTHOS — MEDUSA CLAY WAX: KOC CAMPAIGN JAVASCRIPT
   Interactive features:
   - 5 Content Angles Tab switcher
   - Interactive Affiliate Revenue Calculator (10-15% + Spark Ads boost)
   - Quick Brief Copy to Clipboard + Toast
   - KOC Registration Form handling + Success Modal
   - Mobile Nav Toggle & Smooth Scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initAngleTabs();
  initCalculator();
  initCopyBrief();
  initFormModal();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('active');
    });

    // Close drawer when clicking any link
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. 5 CONTENT ANGLES TAB SWITCHER
   -------------------------------------------------------------------------- */
function initAngleTabs() {
  const tabBtns = document.querySelectorAll('.angle-tab-btn');
  const panels = document.querySelectorAll('.angle-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update button states
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel states
      panels.forEach(p => {
        if (p.id === targetId) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. INTERACTIVE AFFILIATE EARNINGS CALCULATOR
   -------------------------------------------------------------------------- */
function initCalculator() {
  const ordersRange = document.getElementById('calc-orders-range');
  const ordersDisplay = document.getElementById('calc-orders-display');
  const rateDisplay = document.getElementById('calc-rate-display');
  const totalAmount = document.getElementById('calc-total-amount');
  const breakdownText = document.getElementById('calc-breakdown-text');
  const tierBadges = document.querySelectorAll('.tier-badge');

  // Product price assumptions (VND)
  const PRODUCT_PRICE = 180000;

  function calculate() {
    if (!ordersRange) return;
    const orders = parseInt(ordersRange.value, 10);
    ordersDisplay.textContent = orders.toLocaleString('vi-VN') + ' đơn';

    // Determine Commission Tier:
    // < 100 orders: 10%
    // 100 - 299 orders: 12%
    // 300+ orders: 15%
    let commissionRate = 0.10;
    let tierIndex = 0;

    if (orders >= 300) {
      commissionRate = 0.15;
      tierIndex = 2;
    } else if (orders >= 100) {
      commissionRate = 0.12;
      tierIndex = 1;
    }

    // Update active tier badge
    tierBadges.forEach((badge, idx) => {
      if (idx === tierIndex) {
        badge.classList.add('active');
      } else {
        badge.classList.remove('active');
      }
    });

    if (rateDisplay) {
      rateDisplay.textContent = `${Math.round(commissionRate * 100)}%`;
    }

    const totalRevenue = orders * PRODUCT_PRICE;
    const commissionEarned = totalRevenue * commissionRate;

    if (totalAmount) {
      totalAmount.textContent = formatVND(commissionEarned);
    }

    // Format breakdown description
    if (breakdownText) {
      breakdownText.innerHTML = `Doanh số phát sinh: <strong>${formatVND(totalRevenue)}</strong> &bull; Mức hoa hồng: <strong>${Math.round(commissionRate * 100)}%</strong> (${formatVND(PRODUCT_PRICE * commissionRate)}/hộp)`;
    }
  }

  function formatVND(val) {
    return Math.round(val).toLocaleString('vi-VN') + ' ₫';
  }

  if (ordersRange) {
    ordersRange.addEventListener('input', calculate);
    calculate(); // Initial run
  }
}

/* --------------------------------------------------------------------------
   4. COPY BRIEF TO CLIPBOARD & TOAST
   -------------------------------------------------------------------------- */
function initCopyBrief() {
  const copyBtn = document.getElementById('btn-copy-brief');
  const toast = document.getElementById('toast-notification');

  const BRIEF_TEXT = `[THE MYTHOS] — BRIEF SÁP VUỐT TÓC MEDUSA CLAY WAX (TIKTOK CREATOR)
--------------------------------------------------------------------
1. MEDUSA LÀ GÌ?
Sáp vuốt tóc dành cho nam giới tóc mỏng, dễ tiết dầu, hay bị bết và xẹp.

2. THÔNG ĐIỆP CỐT LÕI:
"Tóc mỏng + nhanh dầu → Medusa"
Hút dầu → Nhẹ tóc → Dễ tạo phồng → Giữ nếp lâu.
(Ưu tiên nhấn mạnh: HÚT DẦU + TÓC NHẸ)

3. NỘI DUNG CẦN LÀM RÕ:
Chỉ cần người xem nhớ 1 câu: "Tóc mình mỏng và nhanh dầu → Medusa". Không cần liệt kê tính năng dày đặc.

4. CÁCH THỰC HIỆN:
- Tự do mở đầu, tự do kể chuyện, bối cảnh thực tế.
- Tránh: Đọc kịch bản, giọng quảng cáo bán hàng, khen "thần kỳ".
- Ưu tiên: Video tự nhiên, trải nghiệm thực tế, giọng nói thật của bạn.

5. 5 GỢI Ý HƯỚNG NỘI DUNG:
- Hướng 1: Tóc vuốt xong bị bết → Medusa hút dầu, giữ phồng
- Hướng 2: Tóc mỏng muốn phồng → Sáp siêu nhẹ không đè xẹp tóc
- Hướng 3: Đội mũ bảo hiểm xe máy → Hút dầu, tháo mũ vuốt lại ăn ngay
- Hướng 4: Test thực tế 10 tiếng → Dùng trực tiếp, cho xem kết quả
- Hướng 5: Đánh giá cá nhân / Q&A → Trả lời thắc mắc thật lòng

6. CHÍNH SÁCH HOA HỒNG:
- Hoa hồng 10% - 15% trên mỗi đơn hàng TikTok Shop.
- Video giữ chân tốt → The Mythos tài trợ chạy Spark Ads trực tiếp trên video của bạn để x5-x10 đơn.
- Tặng 01 hộp sáp Medusa full-box trải nghiệm miễn phí.

7. ĐIỀU QUAN TRỌNG NHẤT:
Medusa = Sáp cho tóc mỏng, dễ tiết dầu.
Hút dầu → Tóc nhẹ → Dễ tạo phồng → Giữ nếp.
Cách kể là phần của bạn.`;

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(BRIEF_TEXT).then(() => {
        showToast('Đã sao chép Brief chiến dịch vào bộ nhớ tạm!');
      }).catch(err => {
        console.error('Không thể copy:', err);
        showToast('Sao chép thất bại, bạn có thể copy trực tiếp trên web!');
      });
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* --------------------------------------------------------------------------
   5. REGISTRATION FORM HANDLING & CONFIRMATION MODAL
   -------------------------------------------------------------------------- */
function initFormModal() {
  const form = document.getElementById('koc-signup-form');
  const modal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const modalNameSpan = document.getElementById('modal-creator-name');

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('creator-name');
      const creatorName = nameInput ? nameInput.value.trim() : 'Creator';

      if (modalNameSpan) {
        modalNameSpan.textContent = creatorName;
      }

      // Show modal
      modal.classList.add('active');
      form.reset();
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}
