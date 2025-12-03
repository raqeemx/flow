/**
 * نظام سير العمل - شركة تقييم الآلات والمعدات
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initBackToTop();
    initFlowchartTabs();
    initAnimations();
    initTimelineInteraction();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Flowchart tabs functionality
 */
function initFlowchartTabs() {
    const flowBtns = document.querySelectorAll('.flow-btn');
    const flowcharts = document.querySelectorAll('.flowchart');
    
    flowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active button
            flowBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding flowchart
            flowcharts.forEach(chart => {
                chart.classList.remove('active');
                if (chart.id === `${view}Flowchart` || (view === 'main' && chart.id === 'mainFlowchart')) {
                    chart.classList.add('active');
                }
            });
            
            // Create detailed or decisions flowchart if needed
            if (view === 'detailed' && !document.getElementById('detailedFlowchart')) {
                createDetailedFlowchart();
            } else if (view === 'decisions' && !document.getElementById('decisionsFlowchart')) {
                createDecisionsFlowchart();
            }
        });
    });
}

/**
 * Create detailed flowchart view
 */
function createDetailedFlowchart() {
    const container = document.getElementById('flowchartContainer');
    
    const detailedFlow = document.createElement('div');
    detailedFlow.className = 'flowchart active';
    detailedFlow.id = 'detailedFlowchart';
    
    detailedFlow.innerHTML = `
        <div class="detailed-flow-content">
            <h3 style="text-align: center; margin-bottom: 30px; color: var(--primary);">
                <i class="fas fa-sitemap"></i> المسار التفصيلي لسير العمل
            </h3>
            
            <div class="flow-phases">
                <!-- Phase 1: Reception -->
                <div class="flow-phase">
                    <div class="phase-header receiving-phase">
                        <i class="fas fa-inbox"></i>
                        <span>مرحلة الاستلام</span>
                    </div>
                    <div class="phase-steps">
                        <div class="phase-step">
                            <span class="step-num">1</span>
                            <span class="step-name">استلام الطلب</span>
                            <div class="step-substeps">
                                <span>• تسجيل في CRM</span>
                                <span>• إنشاء رقم مرجعي</span>
                                <span>• إشعار العميل</span>
                            </div>
                        </div>
                        <div class="phase-arrow"><i class="fas fa-arrow-down"></i></div>
                        <div class="phase-step">
                            <span class="step-num">2</span>
                            <span class="step-name">فحص الاختصاص</span>
                            <div class="step-decision">
                                <span class="decision-yes">✓ مقبول</span>
                                <span class="decision-no">✗ خارج الاختصاص</span>
                            </div>
                        </div>
                        <div class="phase-arrow"><i class="fas fa-arrow-down"></i></div>
                        <div class="phase-step">
                            <span class="step-num">3</span>
                            <span class="step-name">دراسة الطلب</span>
                            <div class="step-substeps">
                                <span>• تحليل المتطلبات</span>
                                <span>• تحديد الموارد</span>
                                <span>• تقدير الوقت</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Phase 2: Processing -->
                <div class="flow-phase">
                    <div class="phase-header processing-phase">
                        <i class="fas fa-tasks"></i>
                        <span>مرحلة المعالجة</span>
                    </div>
                    <div class="phase-steps">
                        <div class="phase-step">
                            <span class="step-num">4</span>
                            <span class="step-name">إعداد العرض</span>
                            <div class="step-substeps">
                                <span>• حساب التكلفة</span>
                                <span>• تحديد الجدول</span>
                                <span>• إرسال للعميل</span>
                            </div>
                        </div>
                        <div class="phase-arrow"><i class="fas fa-arrow-down"></i></div>
                        <div class="phase-step">
                            <span class="step-num">5</span>
                            <span class="step-name">التعاقد</span>
                            <div class="step-decision">
                                <span class="decision-yes">✓ موافقة</span>
                                <span class="decision-warn">↺ تفاوض</span>
                                <span class="decision-no">✗ رفض</span>
                            </div>
                        </div>
                        <div class="phase-arrow"><i class="fas fa-arrow-down"></i></div>
                        <div class="phase-step">
                            <span class="step-num">6</span>
                            <span class="step-name">جدولة المعاينة</span>
                            <div class="step-substeps">
                                <span>• تحديد الموعد</span>
                                <span>• تجهيز الفريق</span>
                                <span>• تأكيد للعميل</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Phase 3: Inspection -->
                <div class="flow-phase">
                    <div class="phase-header inspection-phase">
                        <i class="fas fa-search"></i>
                        <span>مرحلة المعاينة</span>
                    </div>
                    <div class="phase-steps">
                        <div class="phase-step highlight-step">
                            <span class="step-num">7</span>
                            <span class="step-name">المعاينة الميدانية</span>
                            <div class="step-substeps">
                                <span>• فحص الآلات</span>
                                <span>• التصوير</span>
                                <span>• جمع البيانات</span>
                            </div>
                        </div>
                        <div class="phase-arrow"><i class="fas fa-arrow-down"></i></div>
                        <div class="phase-step">
                            <span class="step-num">8</span>
                            <span class="step-name">البحث السوقي</span>
                            <div class="step-substeps">
                                <span>• أسعار السوق</span>
                                <span>• بيانات المقارنة</span>
                                <span>• مصادر موثوقة</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Phase 4: Evaluation -->
                <div class="flow-phase">
                    <div class="phase-header evaluation-phase">
                        <i class="fas fa-calculator"></i>
                        <span>مرحلة التقييم</span>
                    </div>
                    <div class="phase-steps">
                        <div class="phase-step">
                            <span class="step-num">9</span>
                            <span class="step-name">التحليل والتقييم</span>
                            <div class="step-methods">
                                <span>طريقة السوق</span>
                                <span>طريقة التكلفة</span>
                                <span>طريقة الدخل</span>
                            </div>
                        </div>
                        <div class="phase-arrow"><i class="fas fa-arrow-down"></i></div>
                        <div class="phase-step">
                            <span class="step-num">10</span>
                            <span class="step-name">إعداد التقرير</span>
                            <div class="step-substeps">
                                <span>• كتابة التقرير</span>
                                <span>• إدراج الصور</span>
                                <span>• الملخص التنفيذي</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Phase 5: Review & Delivery -->
                <div class="flow-phase">
                    <div class="phase-header delivery-phase">
                        <i class="fas fa-paper-plane"></i>
                        <span>المراجعة والتسليم</span>
                    </div>
                    <div class="phase-steps">
                        <div class="phase-step">
                            <span class="step-num">11</span>
                            <span class="step-name">مراجعة الجودة</span>
                            <div class="step-decision">
                                <span class="decision-yes">✓ معتمد</span>
                                <span class="decision-warn">↺ تعديلات</span>
                            </div>
                        </div>
                        <div class="phase-arrow"><i class="fas fa-arrow-down"></i></div>
                        <div class="phase-step final-step">
                            <span class="step-num">12</span>
                            <span class="step-name">التسليم والإغلاق</span>
                            <div class="step-substeps">
                                <span>• تسليم التقرير</span>
                                <span>• الفوترة النهائية</span>
                                <span>• الأرشفة</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Hide main flowchart
    document.getElementById('mainFlowchart').classList.remove('active');
    
    container.appendChild(detailedFlow);
    
    // Add styles for detailed flowchart
    addDetailedFlowchartStyles();
}

/**
 * Create decisions flowchart view
 */
function createDecisionsFlowchart() {
    const container = document.getElementById('flowchartContainer');
    
    const decisionsFlow = document.createElement('div');
    decisionsFlow.className = 'flowchart active';
    decisionsFlow.id = 'decisionsFlowchart';
    
    decisionsFlow.innerHTML = `
        <div class="decisions-flow-content">
            <h3 style="text-align: center; margin-bottom: 30px; color: var(--primary);">
                <i class="fas fa-code-branch"></i> نقاط القرار الرئيسية
            </h3>
            
            <div class="decisions-grid">
                <!-- Decision 1 -->
                <div class="decision-card">
                    <div class="decision-header">
                        <span class="decision-num">1</span>
                        <h4>فحص الاختصاص</h4>
                        <span class="decision-stage">المرحلة 2</span>
                    </div>
                    <div class="decision-question">
                        <i class="fas fa-question-circle"></i>
                        <span>هل نوع الآلات/المعدات ضمن اختصاص الشركة؟</span>
                    </div>
                    <div class="decision-paths">
                        <div class="path success-path">
                            <div class="path-icon"><i class="fas fa-check"></i></div>
                            <div class="path-content">
                                <strong>نعم - مقبول</strong>
                                <p>المتابعة إلى دراسة الطلب</p>
                            </div>
                        </div>
                        <div class="path warning-path">
                            <div class="path-icon"><i class="fas fa-exclamation"></i></div>
                            <div class="path-content">
                                <strong>بيانات ناقصة</strong>
                                <p>طلب استكمال من العميل</p>
                            </div>
                        </div>
                        <div class="path danger-path">
                            <div class="path-icon"><i class="fas fa-times"></i></div>
                            <div class="path-content">
                                <strong>لا - خارج الاختصاص</strong>
                                <p>اعتذار وتوجيه لجهة أخرى</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Decision 2 -->
                <div class="decision-card">
                    <div class="decision-header">
                        <span class="decision-num">2</span>
                        <h4>رد العميل على العرض</h4>
                        <span class="decision-stage">المرحلة 4</span>
                    </div>
                    <div class="decision-question">
                        <i class="fas fa-question-circle"></i>
                        <span>ما هو رد العميل على العرض المالي؟</span>
                    </div>
                    <div class="decision-paths">
                        <div class="path success-path">
                            <div class="path-icon"><i class="fas fa-check"></i></div>
                            <div class="path-content">
                                <strong>موافقة</strong>
                                <p>المتابعة للتعاقد</p>
                            </div>
                        </div>
                        <div class="path warning-path">
                            <div class="path-icon"><i class="fas fa-sync"></i></div>
                            <div class="path-content">
                                <strong>تفاوض</strong>
                                <p>مراجعة وتعديل العرض</p>
                            </div>
                        </div>
                        <div class="path danger-path">
                            <div class="path-icon"><i class="fas fa-times"></i></div>
                            <div class="path-content">
                                <strong>رفض</strong>
                                <p>أرشفة وإغلاق الطلب</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Decision 3 -->
                <div class="decision-card">
                    <div class="decision-header">
                        <span class="decision-num">3</span>
                        <h4>إمكانية الوصول للموقع</h4>
                        <span class="decision-stage">المرحلة 7</span>
                    </div>
                    <div class="decision-question">
                        <i class="fas fa-question-circle"></i>
                        <span>هل يمكن الوصول للموقع في الموعد المحدد؟</span>
                    </div>
                    <div class="decision-paths">
                        <div class="path success-path">
                            <div class="path-icon"><i class="fas fa-check"></i></div>
                            <div class="path-content">
                                <strong>نعم</strong>
                                <p>تنفيذ المعاينة</p>
                            </div>
                        </div>
                        <div class="path warning-path">
                            <div class="path-icon"><i class="fas fa-calendar-alt"></i></div>
                            <div class="path-content">
                                <strong>لا</strong>
                                <p>إعادة الجدولة</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Decision 4 -->
                <div class="decision-card">
                    <div class="decision-header">
                        <span class="decision-num">4</span>
                        <h4>اكتمال بيانات المعاينة</h4>
                        <span class="decision-stage">المرحلة 7</span>
                    </div>
                    <div class="decision-question">
                        <i class="fas fa-question-circle"></i>
                        <span>هل تم جمع كافة البيانات المطلوبة؟</span>
                    </div>
                    <div class="decision-paths">
                        <div class="path success-path">
                            <div class="path-icon"><i class="fas fa-check"></i></div>
                            <div class="path-content">
                                <strong>نعم - مكتملة</strong>
                                <p>المتابعة للتحليل</p>
                            </div>
                        </div>
                        <div class="path warning-path">
                            <div class="path-icon"><i class="fas fa-redo"></i></div>
                            <div class="path-content">
                                <strong>لا - ناقصة</strong>
                                <p>زيارة ميدانية إضافية</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Decision 5 -->
                <div class="decision-card">
                    <div class="decision-header">
                        <span class="decision-num">5</span>
                        <h4>اختيار طريقة التقييم</h4>
                        <span class="decision-stage">المرحلة 9</span>
                    </div>
                    <div class="decision-question">
                        <i class="fas fa-question-circle"></i>
                        <span>ما هي الطريقة المناسبة للتقييم؟</span>
                    </div>
                    <div class="decision-paths">
                        <div class="path info-path">
                            <div class="path-icon"><i class="fas fa-balance-scale"></i></div>
                            <div class="path-content">
                                <strong>طريقة السوق</strong>
                                <p>توفر بيانات مقارنة</p>
                            </div>
                        </div>
                        <div class="path info-path">
                            <div class="path-icon"><i class="fas fa-coins"></i></div>
                            <div class="path-content">
                                <strong>طريقة التكلفة</strong>
                                <p>معدات متخصصة/نادرة</p>
                            </div>
                        </div>
                        <div class="path info-path">
                            <div class="path-icon"><i class="fas fa-chart-line"></i></div>
                            <div class="path-content">
                                <strong>طريقة الدخل</strong>
                                <p>معدات منتجة للدخل</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Decision 6 -->
                <div class="decision-card">
                    <div class="decision-header">
                        <span class="decision-num">6</span>
                        <h4>نتيجة مراجعة الجودة</h4>
                        <span class="decision-stage">المرحلة 11</span>
                    </div>
                    <div class="decision-question">
                        <i class="fas fa-question-circle"></i>
                        <span>هل التقرير يستوفي معايير الجودة؟</span>
                    </div>
                    <div class="decision-paths">
                        <div class="path success-path">
                            <div class="path-icon"><i class="fas fa-check-double"></i></div>
                            <div class="path-content">
                                <strong>معتمد</strong>
                                <p>جاهز للتسليم</p>
                            </div>
                        </div>
                        <div class="path warning-path">
                            <div class="path-icon"><i class="fas fa-edit"></i></div>
                            <div class="path-content">
                                <strong>تعديلات مطلوبة</strong>
                                <p>إعادة للمرحلة 10</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Hide other flowcharts
    document.querySelectorAll('.flowchart').forEach(f => f.classList.remove('active'));
    
    container.appendChild(decisionsFlow);
    
    // Add styles for decisions flowchart
    addDecisionsFlowchartStyles();
}

/**
 * Add styles for detailed flowchart
 */
function addDetailedFlowchartStyles() {
    if (document.getElementById('detailedFlowchartStyles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'detailedFlowchartStyles';
    styles.textContent = `
        .detailed-flow-content {
            padding: 20px;
        }
        
        .flow-phases {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 30px;
        }
        
        .flow-phase {
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            overflow: hidden;
            min-width: 280px;
            max-width: 350px;
            flex: 1;
        }
        
        .phase-header {
            padding: 15px 20px;
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
        }
        
        .phase-header i {
            font-size: 1.3rem;
        }
        
        .receiving-phase { background: linear-gradient(135deg, #667eea, #764ba2); }
        .processing-phase { background: linear-gradient(135deg, #f093fb, #f5576c); }
        .inspection-phase { background: linear-gradient(135deg, #4facfe, #00f2fe); }
        .evaluation-phase { background: linear-gradient(135deg, #43e97b, #38f9d7); }
        .delivery-phase { background: linear-gradient(135deg, #fa709a, #fee140); }
        
        .phase-steps {
            padding: 20px;
        }
        
        .phase-step {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 10px;
        }
        
        .phase-step.highlight-step {
            background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
            border: 2px solid #4caf50;
        }
        
        .phase-step.final-step {
            background: linear-gradient(135deg, #e3f2fd, #e8eaf6);
            border: 2px solid #2196f3;
        }
        
        .step-num {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: #3498db;
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            font-weight: 700;
            margin-left: 10px;
        }
        
        .step-name {
            font-weight: 600;
            color: #2c3e50;
        }
        
        .step-substeps {
            margin-top: 10px;
            padding-right: 40px;
        }
        
        .step-substeps span {
            display: block;
            color: #7f8c8d;
            font-size: 0.85rem;
            margin-bottom: 3px;
        }
        
        .step-decision {
            margin-top: 10px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .step-decision span {
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .decision-yes { background: #d4edda; color: #155724; }
        .decision-warn { background: #fff3cd; color: #856404; }
        .decision-no { background: #f8d7da; color: #721c24; }
        
        .step-methods {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .step-methods span {
            background: linear-gradient(135deg, #3498db, #1abc9c);
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
        }
        
        .phase-arrow {
            text-align: center;
            color: #bdc3c7;
            margin: 5px 0;
        }
        
        @media (max-width: 768px) {
            .flow-phases {
                flex-direction: column;
            }
            
            .flow-phase {
                max-width: 100%;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

/**
 * Add styles for decisions flowchart
 */
function addDecisionsFlowchartStyles() {
    if (document.getElementById('decisionsFlowchartStyles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'decisionsFlowchartStyles';
    styles.textContent = `
        .decisions-flow-content {
            padding: 20px;
        }
        
        .decisions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
        }
        
        .decision-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            overflow: hidden;
            transition: transform 0.3s ease;
        }
        
        .decision-card:hover {
            transform: translateY(-5px);
        }
        
        .decision-header {
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .decision-num {
            width: 35px;
            height: 35px;
            background: #f39c12;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
        }
        
        .decision-header h4 {
            flex: 1;
            margin: 0;
            font-size: 1.1rem;
        }
        
        .decision-stage {
            background: rgba(255,255,255,0.2);
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
        }
        
        .decision-question {
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .decision-question i {
            font-size: 1.5rem;
            color: #f39c12;
        }
        
        .decision-question span {
            font-weight: 500;
            color: #2c3e50;
        }
        
        .decision-paths {
            padding: 20px;
        }
        
        .path {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px;
            border-radius: 10px;
            margin-bottom: 10px;
            transition: transform 0.2s ease;
        }
        
        .path:hover {
            transform: translateX(-5px);
        }
        
        .path:last-child {
            margin-bottom: 0;
        }
        
        .path-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1rem;
            flex-shrink: 0;
        }
        
        .success-path { background: rgba(39, 174, 96, 0.1); }
        .success-path .path-icon { background: #27ae60; }
        
        .warning-path { background: rgba(243, 156, 18, 0.1); }
        .warning-path .path-icon { background: #f39c12; }
        
        .danger-path { background: rgba(231, 76, 60, 0.1); }
        .danger-path .path-icon { background: #e74c3c; }
        
        .info-path { background: rgba(52, 152, 219, 0.1); }
        .info-path .path-icon { background: #3498db; }
        
        .path-content strong {
            display: block;
            color: #2c3e50;
            margin-bottom: 3px;
        }
        
        .path-content p {
            margin: 0;
            font-size: 0.85rem;
            color: #7f8c8d;
        }
        
        @media (max-width: 768px) {
            .decisions-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

/**
 * Initialize scroll animations
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.overview-card, .timeline-item, .scenario-card, .kpi-card, .standard-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Initialize timeline interaction
 */
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const body = item.querySelector('.step-body');
        
        // Add click to expand/collapse on mobile
        if (window.innerWidth <= 768) {
            content.addEventListener('click', function() {
                const isExpanded = body.style.display !== 'none';
                
                // Close all others
                timelineItems.forEach(otherItem => {
                    const otherBody = otherItem.querySelector('.step-body');
                    if (otherBody && otherItem !== item) {
                        otherBody.style.display = 'none';
                    }
                });
                
                // Toggle current
                body.style.display = isExpanded ? 'none' : 'block';
            });
        }
    });
}

/**
 * Utility function to format numbers
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Print functionality
 */
function printWorkflow() {
    window.print();
}

// Export functions for external use
window.WorkflowSystem = {
    printWorkflow,
    createDetailedFlowchart,
    createDecisionsFlowchart
};
