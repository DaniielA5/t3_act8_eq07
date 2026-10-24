// acuerdos de props  


<LoginPage onLoginSuccess={(user) => ...} />
<Navbar user={user} onLogout={handleLogout} />
<Sidebar activeView={activeView} onNavigate={setActiveView} />
<Modal isOpen title onClose>{children}</Modal>
<ConfirmDialog isOpen title message confirmText onConfirm onCancel />
<Loader text="Cargando..." />
<ErrorMessage message onRetry />

